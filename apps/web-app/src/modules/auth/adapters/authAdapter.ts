import type { UserDto } from '../dtos/authDto';

export const toUserViewModel = (dto: UserDto) => ({
  id: dto.id,
  email: dto.email,
  displayName: dto.name,
  // transform as needed
});