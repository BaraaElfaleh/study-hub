//shared/types/notification.ts
export type NotificationType = 'announcement' | 'task_due' | 'new_chat' | 'enrollment';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string; // path to redirect
}