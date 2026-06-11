import type { Notification } from '../../../shared/types/notification';

export const adaptNotification = (dto: any): Notification => ({
  id: dto.id,
  title: dto.title,
  message: dto.message || dto.body,
  type: dto.type || 'announcement',
  read: dto.read || false,
  createdAt: dto.createdAt,
  link: dto.link,
});