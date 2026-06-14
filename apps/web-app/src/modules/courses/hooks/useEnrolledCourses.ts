// src/modules/courses/hooks/useEnrolledCourses.ts
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import type { Course } from '../../../shared/types/course';

export const useEnrolledCourses = (page = 1, limit = 20) => {
  return useQuery<Course[]>({
    queryKey: ['enrolledCourses', { page, limit }],
    queryFn: () => coursesApi.fetchEnrolledCourses({ page, limit }),
  });
};