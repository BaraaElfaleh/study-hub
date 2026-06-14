// src/modules/courses/hooks/useCourses.ts
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import { useCourseStore } from '../store/courseStore';
import type { Course, CourseQueryParams } from '../../../shared/types/course';

export const useCourses = () => {
  const filters = useCourseStore((s) => s.filters);

  const params: CourseQueryParams = {
    search: filters.search || undefined,
  };

  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ['courses', params],
    queryFn: () => coursesApi.fetchCourses(params),
    staleTime: 2 * 60 * 1000,
  });

  return { courses, isLoading, error };
};