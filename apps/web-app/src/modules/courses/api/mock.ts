/**
 * Mock data for courses module
 * This file should be replaced with actual API calls when backend is ready
 */

import type { CourseDTO } from '../dtos/courseDto';

export const mockCoursesData: CourseDTO[] = [
  {
    id: 'course-001',
    title: 'تطوير واجهات الويب بـ React',
    description:
      'تعلم React من الصفر إلى الاحتراف مع مشاريع عملية تغطي hooks، routing، state management.',
    thumbnail: '',
    level: 'beginner',
    price: 149,
    instructor_id: 'user-002',
    instructor_name: 'الأستاذ خالد',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'course-002',
    title: 'تصميم تجربة المستخدم (UI/UX)',
    description: 'أساسيات التصميم وأفضل الممارسات في تصميم واجهات المستخدم.',
    thumbnail: '',
    level: 'beginner',
    price: 99,
    instructor_id: 'user-002',
    instructor_name: 'الأستاذ خالد',
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-05-02T10:00:00Z',
  },
  {
    id: 'course-003',
    title: 'TypeScript المتقدم',
    description: 'عمّق مهاراتك في TypeScript مع أمثلة عملية ودراسات حالات حقيقية.',
    thumbnail: '',
    level: 'advanced',
    price: 199,
    instructor_id: 'user-002',
    instructor_name: 'الأستاذ خالد',
    created_at: '2026-03-05T10:00:00Z',
    updated_at: '2026-05-03T10:00:00Z',
  },
];
