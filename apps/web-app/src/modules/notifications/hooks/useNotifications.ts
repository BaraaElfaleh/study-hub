import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { notificationsApi } from '../api/notificationsApi';
import { adaptNotification } from '../adapters/notificationAdapter';
import { useNotificationStore } from '../store/notificationStore';

/**
 * هوك إدارة الإشعارات.
 * يوفر قائمة الإشعارات، تحديث عداد غير المقروءة، وإمكانية تعليمها كمقروءة.
 */
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
    refetchInterval: 60 * 1000, // تحديث دوري كل دقيقة
  });

  // تحديث عداد غير المقروءة كلما تغيرت الإشعارات
  useEffect(() => {
    if (notifications) {
      const unread = notifications.filter((n) => !n.read).length;
      setUnreadCount(unread);
    }
  }, [notifications, setUnreadCount]);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
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