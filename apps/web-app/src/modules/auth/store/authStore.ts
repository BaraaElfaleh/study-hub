// src/modules/auth/store/authStore.ts
import { create } from 'zustand';
import type { User } from '../../../shared/types/auth';

interface AuthState {
  user: (User & { name?: string }) | null;
  accessToken: string | null;
  refreshToken: string | null;      // جديد
  isAuthenticated: boolean;
  setSession: (user: User, tokens: { accessToken: string; refreshToken: string }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  setSession: (user, tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    set({
      user: {
        ...user,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
    });
  },

  clearSession: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));