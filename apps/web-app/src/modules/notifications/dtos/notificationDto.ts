// src/modules/notifications/dtos/notificationDto.ts
export type NotificationType = 'announcement' | 'task_due' | 'new_chat' | 'enrollment';

export interface NotificationDTO {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}