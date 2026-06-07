// apps/admin-app/src/modules/courses/hooks/useCourses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import { useCoursesStore } from '../store/coursesStore';
import type { Course } from '../../../shared/types/course';

export const useCourses = () => {
  const queryClient = useQueryClient();
  const { search, levelFilter } = useCoursesStore();

  const coursesQuery = useQuery({
    queryKey: ['admin', 'courses', { search, levelFilter }],
    queryFn: () => coursesApi.fetchCourses({ search, level: levelFilter }),
    staleTime: 30 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount'>) =>
      coursesApi.createCourse(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) =>
      coursesApi.updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] }),
  });

  return {
    courses: coursesQuery.data ?? [],
    isLoading: coursesQuery.isLoading,
    error: coursesQuery.error,
    createCourse: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCourse: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCourse: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};