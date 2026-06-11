import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore } from '../store/courseStore';
import { coursesApi } from '../api/coursesApi';
import { adaptCourse } from '../adapters/courseAdapter';
import type { CreateCourseRequest, UpdateCourseRequest, CourseQueryParams } from '../../../shared/types/course';

export const useCourses = () => {
  const queryClient = useQueryClient();
  const filters = useCourseStore((state) => state.filters);

  const { data: courses, isLoading: isLoadingCourses, error: coursesError } = useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const params: CourseQueryParams = { search: filters.search || undefined };
      const dtos = await coursesApi.fetchCourses(params);
      return dtos.map(adaptCourse);
    },
    staleTime: 2 * 60 * 1000,
  });

  const useCourseDetail = (courseId: string) => useQuery({ queryKey: ['course', courseId], queryFn: async () => { const dto = await coursesApi.fetchCourseById(courseId); return adaptCourse(dto); }, enabled: !!courseId });

  const enrollMutation = useMutation({ mutationFn: (courseId: string) => coursesApi.enrollInCourse(courseId, 'current-user-id'), onSuccess: (_, courseId) => { queryClient.invalidateQueries({ queryKey: ['course', courseId] }); } });
  const createMutation = useMutation({ mutationFn: (payload: CreateCourseRequest) => coursesApi.createCourse(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }) });
  const updateMutation = useMutation({ mutationFn: ({ id, data }: { id: string; data: UpdateCourseRequest }) => coursesApi.updateCourse(id, data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }) });
  const deleteMutation = useMutation({ mutationFn: (id: string) => coursesApi.deleteCourse(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }) });

  return { courses, isLoadingCourses, coursesError, useCourseDetail, enrollInCourse: enrollMutation.mutate, createCourse: createMutation.mutate, updateCourse: updateMutation.mutate, deleteCourse: deleteMutation.mutate };
};