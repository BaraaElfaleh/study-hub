// src/modules/classroom/quizzes/hooks/useQuizEditor.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizzesApi } from '../api/quizzesApi';
import type { Quiz, UpdateQuizRequest } from '../../../../shared/types/classroom';

export const useQuizEditor = (courseId: string, quizId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<Quiz>({
    queryKey: ['quiz', quizId],
    queryFn: () => quizzesApi.getQuizById(courseId, quizId),
    enabled: !!quizId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateQuizRequest) => quizzesApi.updateQuiz(courseId, quizId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
      queryClient.invalidateQueries({ queryKey: ['quizzes', courseId] });
    },
  });

  return {
    quiz: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updateQuiz: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};