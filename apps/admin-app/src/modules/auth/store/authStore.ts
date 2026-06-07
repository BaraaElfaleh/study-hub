// apps/admin-app/src/modules/auth/store/authStore.ts
import { create } from 'zustand';
import type { AdminUser } from '../../../shared/types/auth';

interface AuthState {
  user: AdminUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setSession: (user: AdminUser, token: string) => void;
  clearSession: () => void;
  initSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setSession: (user, token) => {
    localStorage.setItem('adminAccessToken', token);
    set({ user, accessToken: token, isAuthenticated: true });
  },

  clearSession: () => {
    localStorage.removeItem('adminAccessToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initSession: () => {
    const token = localStorage.getItem('adminAccessToken');
    if (token) {
      // سيتم جلب بيانات المستخدم لاحقًا عبر useAuth
      set({ accessToken: token, isAuthenticated: true });
    }
  },
}));