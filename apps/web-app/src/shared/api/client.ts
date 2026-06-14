// src/shared/api/client.ts
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../modules/auth/store/authStore';

// إنشاء instance واحد للـ HTTP Client
const client: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:3001',
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
  console.error(`[API Error] ${title}: ${message}`);
  if (window.__apiErrorNotification && typeof window.__apiErrorNotification === 'function') {
    window.__apiErrorNotification(title, message, 'error');
  }
};

// ==================== Request Interceptor ====================
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Response Interceptor (مع تجديد التوكن التلقائي) ====================
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // إذا كان الخطأ 401 ولم نحاول إعادة المحاولة بعد
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${client.defaults.baseURL}/auth/refresh`, {
            refreshToken,
          });
          const newAccessToken = data.accessToken || data.access_token; // دعم كلا الحالتين

          if (!newAccessToken) throw new Error('لم يتم استلام access token جديد');

          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // إعادة إرسال الطلب الأصلي
          return client(originalRequest);
        } catch (refreshError) {
          // فشل التجديد -> مسح الجلسة وتحويل المستخدم
          useAuthStore.getState().clearSession();
          // localStorage.removeItem('refreshToken'); // clearSession تمسحه تلقائيًا
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // لا يوجد refreshToken على الإطلاق
        useAuthStore.getState().clearSession();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    // معالجة الأخطاء الأخرى (غير 401)
    const status = error.response?.status;
    const data = error.response?.data;

    if (status) {
      const { title, message } = getErrorMessage(status, data);
      showErrorNotification(title, message);
    } else {
      showErrorNotification('خطأ في الاتصال', 'فشل الاتصال بالخادم.');
    }

    return Promise.reject(error);
  }
);

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