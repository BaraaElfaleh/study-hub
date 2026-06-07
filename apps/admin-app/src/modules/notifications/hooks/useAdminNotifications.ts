// apps/admin-app/src/modules/notifications/hooks/useAdminNotifications.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api/notificationsApi';

export const useAdminNotifications = () => {
  const queryClient = useQueryClient();

  const notifQuery = useQuery({
    queryKey: ['admin', 'notifications'],
    queryFn: notificationsApi.fetchNotifications,
    staleTime: 30 * 1000,
  });

  const sendMutation = useMutation({
    mutationFn: (data: { title: string; body: string; targetRole: string }) =>
      notificationsApi.sendNotification(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'notifications'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.deleteNotification(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'notifications'] }),
  });

  return {
    notifications: notifQuery.data ?? [],
    isLoading: notifQuery.isLoading,
    error: notifQuery.error,
    sendNotification: sendMutation.mutate,
    isSending: sendMutation.isPending,
    deleteNotification: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};