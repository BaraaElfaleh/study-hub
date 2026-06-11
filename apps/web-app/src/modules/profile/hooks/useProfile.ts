import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import { adaptProfile } from '../adapters/profileAdapter';
import { useAuthStore } from '../../auth/store/authStore';
import type { User } from '../../../shared/types/auth';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user, setSession, accessToken } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const dto = await profileApi.fetchProfile();
      return adaptProfile(dto);
    },
    staleTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => {
      if (!user) throw new Error('غير مصرح');
      return profileApi.updateProfile(user.id, data);
    },
    onSuccess: (data) => {
      if (user) {
        const updatedUser = adaptProfile(data);
        setSession(updatedUser, accessToken!);
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile: profileQuery.data || user,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};