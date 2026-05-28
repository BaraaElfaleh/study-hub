// shared/api/httpClient.ts
import axios from 'axios';
import { useAuthStore } from '../../modules/auth/store/authStore';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor: إرفاق التوكن تلقائياً
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: معالجة 401 عالمياً
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      // التنقل خارج نطاق axios يمكن أن يتم عبر حدث مخصص أو window.location
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;