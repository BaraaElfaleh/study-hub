// apps/admin-app/src/modules/auth/hooks/useAuth.ts
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/authApi';

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

  // استعادة الجلسة مرة واحدة
  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('adminAccessToken')) {
      initSession();
    }
  }, []);

  // جلب المشرف الحالي
  const { data: fetchedUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentAdmin'],
    queryFn: authApi.fetchCurrentAdmin,
    enabled: !!accessToken && !user,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (fetchedUser && !user) {
      setSession(fetchedUser, accessToken!);
    }
  }, [fetchedUser, user, accessToken, setSession]);

  const loginMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      queryClient.invalidateQueries();
      navigate({ to: '/tsx/dashboard' });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.signOut,
    onSettled: () => {
      clearSession();
      queryClient.clear();
      navigate({ to: '/tsx/dashboard' });
    },
  });

  return {
    user: user || fetchedUser || null,
    isAuthenticated: !!user || !!fetchedUser || isAuthenticated,
    isLoading: isUserLoading,

    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
  };
};