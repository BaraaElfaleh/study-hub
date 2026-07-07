import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import client from "../../../shared/api/client"; // عميل axios
import type { AdminUser } from "../../../shared/types/auth";
import type { LoginRequest } from "../../../shared/types/auth";

export const useAuth = () => {
  const nav = useNavigate();
  const setS = useAuthStore((s) => s.setSession);
  const clearS = useAuthStore((s) => s.clearSession);

  const loginMut = useMutation({
    mutationFn: async (p: LoginRequest) => {
      // 1. تسجيل الدخول واستلام التوكنز
      const { accessToken, refreshToken } = await authApi.login(p);
      // 2. جلب بيانات المستخدم من /users/me
      const { data: user } = await client.get<AdminUser>("/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return { user, accessToken, refreshToken };
    },
    onSuccess: ({ user, accessToken }) => {
      console.log("✅ المستخدم:", user);
      if (user.role.toUpperCase() !== "ADMIN") {
        console.error("❌ الدور ليس ADMIN:", user.role);
        throw new Error("غير مصرح");
      }
      setS(user, accessToken);
      console.log("🔐 تم تخزين الجلسة، التوجيه إلى /_admin/dashboard");
      nav({ to: "/_admin/dashboard" });
    },
  });

  const logout = () => {
    clearS();
    nav({ to: "/login" });
  };

  return {
    login: loginMut.mutate,
    isLoading: loginMut.isPending,
    error: loginMut.error,
    logout,
  };
};