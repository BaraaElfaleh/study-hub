// src/modules/courses/hooks/useCourseDetail.ts
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import type { Course } from '../../../shared/types/course';

export const useCourseDetail = (courseId: string) => {
  return useQuery<Course>({
    queryKey: ['course', courseId],
    queryFn: () => coursesApi.fetchCourseById(courseId),
    enabled: !!courseId,
  });
};