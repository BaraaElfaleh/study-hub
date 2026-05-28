import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { ProfileDTO } from '../dtos/profileDto';
import type { User } from '../../../shared/types/auth';

export const adaptProfile = (dto: ProfileDTO): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  role: dto.role,
  avatar: dto.avatar,
  createdAt: format(parseISO(dto.created_at), 'PPP', { locale: ar }),
});