import { create } from "zustand";
import type { AdminUser } from "../../../shared/types/auth";
interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (u: AdminUser, t: string) => void;
  clearSession: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setSession: (u, t) => {
    localStorage.setItem("adminAccessToken", t);
    set({ user: u, token: t, isAuthenticated: true });
  },
  clearSession: () => {
    localStorage.removeItem("adminAccessToken");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
