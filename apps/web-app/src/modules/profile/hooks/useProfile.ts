import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import { adaptProfile } from '../adapters/profileAdapter';
import { useAuthStore } from '../../auth/store/authStore';

/**
 * هوك إدارة الملف الشخصي.
 * يوفر بيانات المستخدم الحالي وإمكانية تحديثها.
 */
export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user, accessToken, setSession } = useAuthStore();

  // جلب بيانات الملف الشخصي
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const dto = await profileApi.fetchProfile();
      return adaptProfile(dto);
    },
    staleTime: 5 * 60 * 1000,
  });

  // تحديث الملف الشخصي
  const updateProfileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (data) => {
      const updatedUser = adaptProfile(data);
      setSession(updatedUser, accessToken || '');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile: profile || user, // fallback للمستخدم الحالي
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};