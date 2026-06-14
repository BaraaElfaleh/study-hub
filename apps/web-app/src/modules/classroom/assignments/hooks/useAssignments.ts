// src/modules/classroom/assignments/hooks/useAssignments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsApi } from '../api/assignmentsApi';
import type {
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from '../../../../shared/types/classroom';

export const useAssignments = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['assignments', courseId];

  const {
    data: assignments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => assignmentsApi.getAssignments(courseId),
    enabled: !!courseId,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateAssignmentRequest) =>
      assignmentsApi.createAssignment(courseId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssignmentRequest }) =>
      assignmentsApi.updateAssignment(courseId, id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => assignmentsApi.deleteAssignment(courseId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    assignments,
    isLoading,
    error,
    createAssignment: createMutation.mutate,
    updateAssignment: updateMutation.mutate,
    deleteAssignment: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};