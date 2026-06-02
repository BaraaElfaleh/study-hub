import type { NotificationType } from "../../../shared/types/notification"; // نستورد النوع المشترك

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