import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { useAuthStore } from '../../modules/auth/store/authStore';

// إنشاء instance واحد للـ HTTP Client
const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
// معالجة الأخطاء العامة بشكل موحد (401, 403, 500+)
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorData = error.response?.data as Record<string, unknown>;
    const errorMessage = (errorData?.message as string) || error.message || 'حدث خطأ ما';

    // معالجة 401 - غير مصرح
    if (status === 401) {
      console.error('❌ [401] غير مصرح - يرجى تسجيل الدخول:', errorMessage);
      const authStore = useAuthStore.getState();
      authStore.clearSession();
      window.location.href = '/login';
    }
    // معالجة 403 - ممنوع
    else if (status === 403) {
      console.error('❌ [403] ممنوع - ليس لديك صلاحيات:', errorMessage);
      // يمكن إضافة toast هنا في المستقبل
    }
    // معالجة 5xx - خطأ في الخادم
    else if (status && status >= 500) {
      console.error(
        `❌ [${status}] خطأ في الخادم - الرجاء المحاولة لاحقاً:`,
        errorMessage
      );
      // يمكن إضافة toast هنا في المستقبل
    }
    // معالجة أخطاء أخرى
    else if (error.message) {
      console.error('⚠️ [خطأ] شبكة أو خطأ آخر:', errorMessage);
    }

    return Promise.reject(error);
  }
);

export default client;
