// apps/admin-app/src/modules/notifications/api/notificationsApi.ts
import type { AdminNotification } from '../../../shared/types/notification';

const mockNotifications: AdminNotification[] = [
  { id: 'n1', title: 'تحديث المنصة', body: 'تم تحديث المنصة إلى الإصدار 2.0', targetRole: 'all', sentAt: '2026-06-01T10:00:00Z', readCount: 1200 },
  { id: 'n2', title: 'كورس جديد', body: 'تم إضافة كورس تحليل البيانات', targetRole: 'student', sentAt: '2026-05-28T14:00:00Z', readCount: 450 },
  { id: 'n3', title: 'اجتماع المعلمين', body: 'اجتماع يوم الأحد الساعة 5 مساءً', targetRole: 'teacher', sentAt: '2026-05-25T09:00:00Z', readCount: 18 },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const notificationsApi = {
  fetchNotifications: async (): Promise<AdminNotification[]> => {
    await delay(500);
    return [...mockNotifications];
  },

  sendNotification: async (data: { title: string; body: string; targetRole: string }): Promise<AdminNotification> => {
    await delay(600);
    const newNotif: AdminNotification = {
      id: `n${Date.now()}`,
      title: data.title,
      body: data.body,
      targetRole: data.targetRole as AdminNotification['targetRole'],
      sentAt: new Date().toISOString(),
      readCount: 0,
    };
    mockNotifications.unshift(newNotif);
    return newNotif;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await delay(400);
    const idx = mockNotifications.findIndex(n => n.id === id);
    if (idx === -1) throw new Error('الإشعار غير موجود');
    mockNotifications.splice(idx, 1);
  },
};