// apps/admin-app/src/modules/auth/api/authApi.ts
import type { LoginRequest, AuthResponse, AdminUser } from '../../../shared/types/auth';

// بيانات المشرف الوهمية (ثابتة)
const mockAdmin: AdminUser = {
  id: 'admin-001',
  name: 'علاء الخضري',
  email: 'admin@alnoon.com',
  role: 'super_admin',
  avatar: undefined,
  createdAt: '2023-06-15T10:00:00Z',
};

export const authApi = {
  signIn: async (payload: LoginRequest): Promise<AuthResponse> => {
    // في المستقبل: استبدل بـ client.post('/auth/login', payload)
    await new Promise((res) => setTimeout(res, 600)); // محاكاة تأخير الشبكة

    // لأغراض المحاكاة: نقبل أي بريد إلكتروني وأي كلمة مرور
    return {
      user: { ...mockAdmin, email: payload.email }, // نضع البريد المُدخل ليظهر في الواجهة
      accessToken: 'mock-admin-token-12345',
    };
  },

  signOut: async (): Promise<void> => {
    // await client.post('/auth/logout');
  },

  fetchCurrentAdmin: async (): Promise<AdminUser> => {
    // await client.get<AdminUser>('/auth/me');
    await new Promise((res) => setTimeout(res, 400));
    return mockAdmin;
  },
};