// src/shared/api/client.ts
import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { useAuthStore } from '../../modules/auth/store/authStore';

// إنشاء instance واحد للـ HTTP Client
const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// ==================== Helper: Error Message Generator ====================
const getErrorMessage = (
  status: number,
  data: unknown
): { title: string; message: string } => {
  const errorData = data as Record<string, unknown> | undefined;
  
  // تحويل الرسالة القادمة من السيرفر إلى string بشكل آمن
  const getSafeMessage = (val: unknown): string => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') return JSON.stringify(val);
    return '';
  };

  const serverMessage = getSafeMessage(errorData?.message || errorData?.error);

  switch (status) {
    case 400:
      return {
        title: 'خطأ في الطلب',
        message: serverMessage || 'بيانات غير صحيحة. يرجى التحقق من المدخلات.',
      };
    case 401:
      return {
        title: 'جلسة منتهية',
        message: 'انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.',
      };
    case 403:
      return {
        title: 'وصول مرفوض',
        message: 'ليس لديك الصلاحية للقيام بهذا الإجراء.',
      };
    case 404:
      return {
        title: 'لم يتم العثور',
        message: 'المورد المطلوب غير موجود.',
      };
    case 409:
      return {
        title: 'تعارض البيانات',
        message: serverMessage || 'هناك تعارض في البيانات. يرجى إعادة المحاولة.',
      };
    case 422:
      return {
        title: 'بيانات غير صحيحة',
        message: serverMessage || 'البيانات المرسلة غير صحيحة.',
      };
    case 429:
      return {
        title: 'عدد محاولات كثير',
        message: 'لقد حاولت مرات كثيرة. يرجى الانتظار قبل المحاولة مرة أخرى.',
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        title: 'خطأ في الخادم',
        message: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً (رمز الخطأ: ' + status + ')',
      };
    default:
      return {
        title: 'خطأ غير متوقع',
        message: serverMessage || 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.',
      };
  }
};
// ==================== Helper: Show Notification ====================
const showErrorNotification = (title: string, message: string): void => {
  const errorLogMessage = `[API Error] ${title}: ${message}`;
  console.error(errorLogMessage);

  // محاولة استدعاء دالة Notification إذا كانت متاحة من خلال window أو أي آلية أخرى
  // هذا يسمح بتكامل مستقبلي مع نظام Toast/Notification
  if (window.__apiErrorNotification && typeof window.__apiErrorNotification === 'function') {
    window.__apiErrorNotification(title, message, 'error');
  }
};

// ==================== Request Interceptor ====================
// إضافة Token إلى كل طلب تلقائياً
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== Response Interceptor ====================
// معالجة الأخطاء العامة والـ 401 و 403 و 5xx
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (!status) {
      // خطأ في الشبكة أو لم يتم الرد من السيرفر
      showErrorNotification(
        'خطأ في الاتصال',
        'فشل الاتصال بالخادم. يرجى التحقق من الإنترنت.'
      );
      return Promise.reject(error);
    }

    // الحصول على رسالة الخطأ
    const { title, message } = getErrorMessage(status, data);
    showErrorNotification(title, message);

    // معالجة حالات خاصة
    if (status === 401) {
      // مسح الجلسة وإعادة التوجيه للـ login
      const authStore = useAuthStore.getState();
      authStore.clearSession();
      window.location.href = '/login';
    }

    // رفع الخطأ ليتمكن المستدعي من معالجته إذا لزم الأمر
    return Promise.reject(error);
  }
);

// Allow external code to set a notification callback
declare global {
  interface Window {
    __apiErrorNotification?: (
      title: string,
      message: string,
      type: 'error' | 'warning' | 'info' | 'success'
    ) => void;
  }
}

export default client;
