// src/modules/classroom/enrollments/hooks/useCourseEnrollments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentApi } from '../api/enrollmentApi';

export const useCourseEnrollments = (courseId: string) => {
  const queryClient = useQueryClient();
  const key = ['enrollments', courseId];

  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: () => enrollmentApi.getCourseEnrollments(courseId),
    enabled: !!courseId,
  });

  const enrollMutation = useMutation({
    mutationFn: (studentId: string) => enrollmentApi.enrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const unenrollMutation = useMutation({
    mutationFn: (studentId: string) => enrollmentApi.unenrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return {
    students: data,
    isLoading,
    error,
    enrollStudent: enrollMutation.mutate,
    unenrollStudent: unenrollMutation.mutate,
    isEnrolling: enrollMutation.isPending,
    isUnenrolling: unenrollMutation.isPending,
  };
};