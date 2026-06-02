// apps/admin-app/src/shared/api/client.ts
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – إرفاق التوكن
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminAccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor – معالجة 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminAccessToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default client;