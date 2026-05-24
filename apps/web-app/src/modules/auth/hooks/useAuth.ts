// features/auth/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    accessToken,
    setSession,
    clearSession,
    initSession,
  } = useAuthStore();

  // تأكد من استدعاء initSession في مكان مركزي (مثلاً App.tsx) لمرة واحدة
  // لكن نستدعيها هنا لضمان عدم تفويتها (مع فحص إذا لم تُستدع بعد)
  if (!isAuthenticated && localStorage.getItem('accessToken')) {
    initSession();
  }

  // جلب بيانات المستخدم إذا كان لدينا token ولكن لا يوجد user كامل
  const { data: fetchedUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.fetchCurrentUser,
    enabled: !!accessToken && !user,
    staleTime: 5 * 60 * 1000,
  });

  // تحديث المتجر عند استلام المستخدم
  if (fetchedUser && !user) {
    setSession(fetchedUser, accessToken!);
  }

  // ------------------ تسجيل الدخول ------------------
  const loginMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      queryClient.invalidateQueries(); // تحديث أي استعلامات معلقة
      navigate({ to: '/dashboard' }); // إعادة توجيه إلى لوحة التحكم
    },
  });

  // ------------------ التسجيل ------------------
  const registerMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      navigate({ to: '/dashboard' });
    },
  });

  // ------------------ تسجيل الخروج ------------------
  const logoutMutation = useMutation({
    mutationFn: authService.signOut,
    onSettled: () => {
      clearSession();
      queryClient.clear();
      navigate({ to: '/login' });
    },
  });

  return {
    user: user || fetchedUser || null,
    isAuthenticated: !!user || !!fetchedUser || isAuthenticated,
    isLoading: loginMutation.isPending || registerMutation.isPending || isUserLoading,

    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};