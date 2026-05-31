import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore } from '../store/courseStore';
import { coursesApi } from '../api/coursesApi';
import { adaptCourse } from '../adapters/courseAdapter';
import { useAuth } from '../../auth/hooks/useAuth';
import { checkPermission } from '../../../shared/utils/permissions';
import { useCourseDetail } from './useCourseDetail'; // استيراد الـ Hook المستقل
import type {
  UseCourseReturn,
  CreateCoursePayload,
  UpdateCoursePayload,
} from '../dtos/courseDto';

export const useCourses = (): UseCourseReturn => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const filters = useCourseStore((state) => state.filters);

  // ==================== Queries ====================
  const coursesQuery = useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const dtos = await coursesApi.fetchCourses({
        search: filters.search,
        level: filters.level || undefined,
      });
      return dtos.map(adaptCourse);
    },
    staleTime: 2 * 60 * 1000,
  });

  // ==================== Mutations ====================
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.enrollInCourse(courseId),
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateCoursePayload) => coursesApi.createCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ courseId, updates }: { courseId: string; updates: UpdateCoursePayload }) =>
      coursesApi.updateCourse(courseId, updates),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  // ==================== Logic ====================
  const canEnroll = user && checkPermission(user.role, 'enroll');
  const canCreateCourse = user && checkPermission(user.role, 'create_course');

  return {
    courses: coursesQuery.data,
    isLoadingCourses: coursesQuery.isLoading,
    coursesError: coursesQuery.error as Error | null,

    // استخدام الـ Hook المستقل
    useCourseDetail,

    enrollInCourse: (courseId: string) => {
      if (!canEnroll) throw new Error('غير مسموح بالتسجيل');
      enrollMutation.mutate(courseId);
    },
    createCourse: (payload) => {
      if (!canCreateCourse) throw new Error('غير مسموح بإنشاء دورات');
      createMutation.mutate(payload);
    },
    updateCourse: (id, updates) => updateMutation.mutate({ courseId: id, updates }),
    deleteCourse: (id) => deleteMutation.mutate(id),

    enrollState: { isPending: enrollMutation.isPending, error: enrollMutation.error as Error | null, isSuccess: enrollMutation.isSuccess },
    createState: { isPending: createMutation.isPending, error: createMutation.error as Error | null, isSuccess: createMutation.isSuccess },
    updateState: { isPending: updateMutation.isPending, error: updateMutation.error as Error | null, isSuccess: updateMutation.isSuccess },
    deleteState: { isPending: deleteMutation.isPending, error: deleteMutation.error as Error | null, isSuccess: deleteMutation.isSuccess },
  };
};