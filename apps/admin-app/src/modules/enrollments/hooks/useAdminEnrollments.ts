import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentsApi } from '../api/enrollmentsApi';
import { useEnrollmentsStore } from '../store/enrollmentsStore';

export const useAdminEnrollments = () => {
  const queryClient = useQueryClient();
  const selectedCourseId = useEnrollmentsStore((s) => s.selectedCourseId);
  const key = ['admin-enrollments', selectedCourseId];

  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: () => enrollmentsApi.getCourseEnrollments(selectedCourseId),
    enabled: !!selectedCourseId,
  });

  const enrollMutation = useMutation({
    mutationFn: ({ courseId, studentId }: { courseId: string; studentId: string }) =>
      enrollmentsApi.enrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const unenrollMutation = useMutation({
    mutationFn: ({ courseId, studentId }: { courseId: string; studentId: string }) =>
      enrollmentsApi.unenrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ enrollmentId, progress }: { enrollmentId: string; progress: number }) =>
      enrollmentsApi.updateProgress(enrollmentId, progress),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return {
    enrollments: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    enrollStudent: enrollMutation.mutate,
    unenrollStudent: unenrollMutation.mutate,
    updateProgress: updateProgressMutation.mutate,
  };
};