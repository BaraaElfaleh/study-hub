import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { CourseDTO, EnrollmentDTO } from '../dtos/courseDto';
import type { Course } from '../../../shared/types/course';
import type { Enrollment } from '../../../shared/types/enrollment';

export const adaptCourse = (dto: CourseDTO): Course => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  thumbnail: dto.thumbnail,
  level: dto.level,
  price: dto.price,
  instructorId: dto.instructor_id,
  // نضمن أن القيمة نصية دائماً لتتوافق مع النوع في shared/types
  instructorName: dto.instructor_name || '', 
  createdAt: format(parseISO(dto.created_at), 'PPP', { locale: ar }),
  updatedAt: format(parseISO(dto.updated_at), 'PPP', { locale: ar }),
});

export const adaptEnrollment = (dto: EnrollmentDTO): Enrollment => ({
  id: dto.id,
  userId: dto.user_id,
  courseId: dto.course_id,
  enrolledAt: format(parseISO(dto.enrolled_at), 'PPP', { locale: ar }),
  status: dto.status,
});