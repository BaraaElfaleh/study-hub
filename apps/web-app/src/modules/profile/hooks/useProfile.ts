// src/modules/profile/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profileApi';
import { useAuthStore } from '../../auth/store/authStore';
import type { User } from '../../../shared/types/auth';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user, setSession, accessToken, refreshToken } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.fetchProfile,
    staleTime: 0, // نجيب دائماً البيانات الحديثة
    enabled: !!accessToken,
  });

  // المستخدم الحالي: من الجلب أو من المتجر
  const currentUser = profileQuery.data ?? user;

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => {
      if (!currentUser?.id) throw new Error('المستخدم غير معروف');
      console.log('🔄 تحديث المستخدم:', currentUser.id);
      return profileApi.updateProfile(currentUser.id, data);
    },
    onSuccess: (updatedUser) => {
      // تحديث بيانات المستخدم في المتجر
      if (accessToken && refreshToken) {
        setSession(updatedUser, { accessToken, refreshToken });
      }
      // إعادة جلب البروفايل لتحديث الواجهة
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile: currentUser,
    isLoading: profileQuery.isLoading && !user,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};