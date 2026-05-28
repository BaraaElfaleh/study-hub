// src/modules/auth/store/authStore.ts
import { create } from 'zustand';
import type { User } from '../../../shared/types/auth';
import { mockUser } from '../../../mock/data'; // استيراد المستخدم الوهمي

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setSession: (user: User, token: string) => void;
  clearSession: () => void;
  initSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 🟢 ابدأ بمستخدم وهمي مباشرة لتجربة الواجهات
  user: mockUser,
  accessToken: 'mock-token-12345',
  isAuthenticated: true,

  setSession: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({ user, accessToken: token, isAuthenticated: true });
  },

  clearSession: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initSession: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      set({ accessToken: token, isAuthenticated: true, user: mockUser });
    }
  },
}));