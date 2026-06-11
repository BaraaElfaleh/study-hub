import type { Course } from '../../../shared/types/course';

export const adaptCourse = (dto: any): Course => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  thumbnail: dto.thumbnail || '',
  level: dto.level || 'beginner',
  price: dto.price || 0,
  isActive: dto.isActive,
  teacherId: dto.teacherId,
  teacher: dto.teacher,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});