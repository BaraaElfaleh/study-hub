// apps/admin-app/src/shared/types/notification.ts
export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  targetRole?: 'all' | 'student' | 'teacher';
  sentAt: string;
  readCount: number;
}