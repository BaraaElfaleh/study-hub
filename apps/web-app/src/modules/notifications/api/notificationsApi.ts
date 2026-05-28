// src/modules/notifications/api/notificationsApi.ts
import type { NotificationDTO } from '../dtos/notificationDto';
import { mockNotifications } from '../../../mock/data';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationDTO[]> => {
    await delay(600);
    return [...mockNotifications];
  },
  markAsRead: async (notificationId: string): Promise<void> => {
    await delay(300);
    const notif = mockNotifications.find((n) => n.id === notificationId);
    if (notif) notif.read = true;
  },
  markAllAsRead: async (): Promise<void> => {
    await delay(400);
    mockNotifications.forEach((n) => (n.read = true));
  },
};