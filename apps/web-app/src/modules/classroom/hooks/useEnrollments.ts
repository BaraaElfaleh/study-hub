import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';

export const useEnrollments = () => {
  const queryClient = useQueryClient();
  const myEnrollmentsQuery = useQuery({ queryKey: ['my-enrollments'], queryFn: classroomApi.getMyEnrollments, staleTime: 2 * 60 * 1000 });
  const updateProgressMutation = useMutation({
    mutationFn: ({ enrollmentId, progress }: { enrollmentId: string; progress: number }) => classroomApi.updateProgress(enrollmentId, progress),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-enrollments'] }),
  });
  return { enrollments: myEnrollmentsQuery.data, isLoading: myEnrollmentsQuery.isLoading, error: myEnrollmentsQuery.error, updateProgress: updateProgressMutation.mutate, isUpdatingProgress: updateProgressMutation.isPending };
};