import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore } from '../store/courseStore';
import { coursesApi } from '../api/coursesApi';
import { useAuth } from '../../auth/hooks/useAuth';
import { checkPermission } from '../../../shared/utils/permissions';
import { adaptCourse} from '../adapters/courseAdapter';

export const useCourses = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const filters = useCourseStore((state) => state.filters);

  // قائمة الدورات
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const dtos = await coursesApi.fetchCourses({ search: filters.search, level: filters.level });
      return dtos.map(adaptCourse);
    },
    staleTime: 2 * 60 * 1000,
  });

  // تفاصيل دورة
  const useCourseDetail = (courseId: string) =>
    useQuery({
      queryKey: ['course', courseId],
      queryFn: async () => {
        const dto = await coursesApi.fetchCourseById(courseId);
        return adaptCourse(dto);
      },
      enabled: !!courseId,
    });

  // تسجيل
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.enrollInCourse(courseId),
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });

  // صلاحيات
  const canEnroll = user && checkPermission(user.role, 'enroll');

  return {
    courses,
    isLoadingCourses,
    coursesError,
    useCourseDetail,
    enrollInCourse: (courseId: string) => {
      if (!canEnroll) throw new Error('غير مسموح بالتسجيل');
      enrollMutation.mutate(courseId);
    },
    enrollState: enrollMutation,
  };
};