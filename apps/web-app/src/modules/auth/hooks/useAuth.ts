import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';
import type { LoginRequest, RegisterRequest } from '../../../shared/types/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isAuthenticated, setSession, clearSession } = useAuthStore();

  const { data: fetchedUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.fetchCurrentUser,
    enabled: !!localStorage.getItem('accessToken') && !user,
    staleTime: 5 * 60 * 1000,
  });

  if (fetchedUser && !user) {
    setSession(fetchedUser, localStorage.getItem('accessToken')!);
  }

  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) => authService.signIn(payload),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate({ to: '/tsx/dashboard' });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => authService.signUp(payload),
    onSuccess: () => {
      navigate({ to: '/login' });
    },
  });

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