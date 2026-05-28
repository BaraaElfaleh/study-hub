// src/modules/notifications/adapters/notificationAdapter.ts
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { NotificationDTO } from '../dtos/notificationDto';
import type { Notification } from '../../../shared/types/notification';

export const adaptNotification = (dto: NotificationDTO): Notification => ({
  id: dto.id,
  userId: dto.user_id,
  type: dto.type,
  title: dto.title,
  message: dto.message,
  read: dto.read,
  createdAt: format(parseISO(dto.created_at), 'PPPpp', { locale: ar }),
  link: dto.link,
});