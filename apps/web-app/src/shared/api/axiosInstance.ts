// src/modules/shared/api/axiosInstance.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.your-lms-domain.com/api', // استبدله برابط الباك اند الخاص بك
  headers: {
    'Content-Type': 'application/json',
  },
});

// هنا يمكنك لاحقاً إضافة الـ Interceptor لجلب الـ Token
export default api;