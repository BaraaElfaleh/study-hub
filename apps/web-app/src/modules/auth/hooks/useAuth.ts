// src/modules/auth/hooks/useAuth.ts
import { useEffect } from 'react';
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

  // استعادة الجلسة مرة واحدة عند التحميل
  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('accessToken')) {
      initSession();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // جلب المستخدم الحالي إذا كان لدينا token فقط
  const { data: fetchedUser, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.fetchCurrentUser,
    enabled: !!accessToken && !user,
    staleTime: 5 * 60 * 1000,
  });

  // تحديث المتجر عند استلام المستخدم
  useEffect(() => {
    if (fetchedUser && !user) {
      setSession(fetchedUser, accessToken!);
    }
  }, [fetchedUser, user, accessToken, setSession]);

  const loginMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      queryClient.invalidateQueries();
      navigate({ to: '/tsx/dashboard' });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      navigate({ to: '/tsx/dashboard' });
    },
  });

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
    userError,

    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};