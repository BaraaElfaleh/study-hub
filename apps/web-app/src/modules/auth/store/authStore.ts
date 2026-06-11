import { create } from 'zustand';
import type { User } from '../../../shared/types/auth';

interface AuthState {
  user: (User & { name?: string }) | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setSession: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({
      user: {
        ...user,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
      accessToken: token,
      isAuthenticated: true,
    });
  },
  clearSession: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));