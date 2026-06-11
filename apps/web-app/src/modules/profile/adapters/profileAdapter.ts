import type { User } from '../../../shared/types/auth';

export const adaptProfile = (dto: any): User => ({
  id: dto.id,
  email: dto.email,
  firstName: dto.firstName,
  lastName: dto.lastName,
  role: dto.role,
  avatarUrl: dto.avatarUrl,
  isActive: dto.isActive,
  createdAt: dto.createdAt,
});