import client from '../../../shared/api/client';
import type { Notification } from '../../../shared/types/notification';

export const notificationsApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await client.get<Notification[]>('/notifications');
    return data;
  },
  markAsRead: async (notificationId: string): Promise<void> => {
    await client.patch(`/notifications/${notificationId}/read`);
  },
  markAllAsRead: async (): Promise<void> => {
    await client.post('/notifications/read-all');
  },
};