export type NotificationType = 'announcement' | 'task_due' | 'new_chat' | 'enrollment';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
}