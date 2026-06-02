// src/modules/courses/hooks/useCourseDetail.ts
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import { adaptCourse } from '../adapters/courseAdapter';
import type { Course } from '../../../shared/types/course';

interface UseCourseDetailReturn {
  data: Course | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useCourseDetail = (courseId: string): UseCourseDetailReturn => {
  const query = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const dto = await coursesApi.fetchCourseById(courseId);
      return adaptCourse(dto);
    },
    enabled: !!courseId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error as Error | null,
  };
};