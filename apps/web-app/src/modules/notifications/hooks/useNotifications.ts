// src/modules/notifications/hooks/useNotifications.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { notificationsApi } from '../api/notificationsApi';
import { adaptNotification } from '../adapters/notificationAdapter';
import { useNotificationStore } from '../store/notificationStore';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { setUnreadCount } = useNotificationStore();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const dtos = await notificationsApi.getNotifications();
      return dtos.map(adaptNotification);
    },
    staleTime: 30 * 1000,
  });

  // تحديث عداد غير المقروءة
  useEffect(() => {
    if (notifications) {
      const count = notifications.filter((n) => !n.read).length;
      setUnreadCount(count);
    }
  }, [notifications, setUnreadCount]);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notifications: notifications ?? [],
    isLoading,
    error,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarking: markAsReadMutation.isPending,
    isMarkingAll: markAllAsReadMutation.isPending,
  };
};