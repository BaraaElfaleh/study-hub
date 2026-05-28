// src/modules/profile/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import { adaptProfile } from '../adapters/profileAdapter';
import { useAuthStore } from '../../auth/store/authStore';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { setSession, user } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const dto = await profileApi.fetchProfile();
      return adaptProfile(dto);
    },
    staleTime: 5 * 60 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (data) => {
      // تحديث المستخدم في authStore بعد التعديل
      const adapted = adaptProfile(data);
      setSession(adapted, useAuthStore.getState().accessToken || '');
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