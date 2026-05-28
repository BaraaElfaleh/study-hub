import axios, { AxiosError, AxiosInstance } from 'axios';
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
// معالجة الأخطاء العامة والـ 401
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // معالجة خطأ Unauthorized (401)
    if (error.response?.status === 401) {
      // مسح الجلسة وإعادة التوجيه للـ login
      const authStore = useAuthStore.getState();
      authStore.clearSession();
      window.location.href = '/login';
    }

    // معالجة أخطاء Forbidden (403)
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    // معالجة أخطاء Server (5xx)
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.response.status);
    }

    return Promise.reject(error);
  }
);

export default client;
