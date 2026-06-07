// apps/admin-app/src/modules/settings/hooks/useSettings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi, type PlatformSettings } from '../api/settingsApi';

export const useSettings = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: settingsApi.fetchSettings,
    staleTime: 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<PlatformSettings>) => settingsApi.updateSettings(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] }),
  });

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    error: settingsQuery.error,
    updateSettings: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    isSuccess: updateMutation.isSuccess,
  };
};