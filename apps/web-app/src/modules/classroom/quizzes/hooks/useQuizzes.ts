// src/modules/classroom/quizzes/hooks/useQuizzes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizzesApi } from '../api/quizzesApi';
import type {
  CreateQuizRequest,
  UpdateQuizRequest,
} from '../../../../shared/types/classroom';

export const useQuizzes = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['quizzes', courseId];

  const {
    data: quizzes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => quizzesApi.getQuizzes(courseId),
    enabled: !!courseId,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateQuizRequest) =>
      quizzesApi.createQuiz(courseId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuizRequest }) =>
      quizzesApi.updateQuiz(courseId, id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quizzesApi.deleteQuiz(courseId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    quizzes,
    isLoading,
    error,
    createQuiz: createMutation.mutate,
    updateQuiz: updateMutation.mutate,
    deleteQuiz: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};