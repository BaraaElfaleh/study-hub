// src/modules/auth/hooks/useAuth.ts
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';
import type { LoginRequest, RegisterRequest } from '../../../shared/types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    setSession,
    clearSession,
    // accessToken,
  } = useAuthStore();

  // جلب بيانات المستخدم من الخادم عند وجود accessToken وعدم وجود user محلي
  const { data: fetchedUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.fetchCurrentUser,
    enabled: !!localStorage.getItem('accessToken') && !user,
    staleTime: 5 * 60 * 1000,
  });

  // تحديث الجلسة بعد الجلب الناجح (تم نقله إلى useEffect لمنع الخطأ أثناء render)
  useEffect(() => {
    if (fetchedUser && !user) {
      const token = localStorage.getItem('accessToken') || '';
      const refresh = localStorage.getItem('refreshToken') || '';
      setSession(fetchedUser, { accessToken: token, refreshToken: refresh });
    }
  }, [fetchedUser, user, setSession]);

  // طفرة تسجيل الدخول
  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) => authService.signIn(payload),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate({ to: '/courses' });
    },
  });

  // طفرة التسجيل
  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => authService.signUp(payload),
    onSuccess: () => {
      navigate({ to: '/login' });
    },
  });

  // تسجيل الخروج
  const logout = () => {
    clearSession();
    queryClient.clear();
    navigate({ to: '/' });
  };

  return {
    user: user || fetchedUser || null,
    isAuthenticated: !!user || !!fetchedUser || isAuthenticated,
    isLoading: loginMutation.isPending || registerMutation.isPending || isUserLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};