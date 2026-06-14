// src/modules/classroom/assignments/hooks/useSubmissions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsApi } from '../api/assignmentsApi';
import type { SubmitAssignmentRequest } from '../../../../shared/types/classroom';

export const useSubmissions = (courseId: string, assignmentId: string) => {
  const queryClient = useQueryClient();
  const mySubKey = ['mySubmission', assignmentId];
  const allSubsKey = ['submissions', assignmentId];

  const {
    data: mySubmission,
    isLoading: isLoadingMy,
    error: errorMy,
  } = useQuery({
    queryKey: mySubKey,
    queryFn: () => assignmentsApi.getMySubmission(courseId, assignmentId),
    enabled: !!assignmentId,
  });

  const {
    data: submissions,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useQuery({
    queryKey: allSubsKey,
    queryFn: () => assignmentsApi.getSubmissions(courseId, assignmentId),
    enabled: !!assignmentId,
  });

  const submitMutation = useMutation({
    mutationFn: (payload: SubmitAssignmentRequest) =>
      assignmentsApi.submitAssignment(courseId, assignmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mySubKey });
      queryClient.invalidateQueries({ queryKey: allSubsKey });
    },
  });

  return {
    mySubmission,
    submissions,
    isLoading: isLoadingMy || isLoadingAll,
    error: errorMy || errorAll,
    submit: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
  };
};