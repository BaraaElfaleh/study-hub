// src/modules/classroom/lectures/hooks/useLectures.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lecturesApi } from '../api/lecturesApi';
import type {
  CreateLectureRequest,
  UpdateLectureRequest,
} from '../../../../shared/types/classroom';

export const useLectures = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['lectures', courseId];

  const {
    data: lectures = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => lecturesApi.getLectures(courseId),
    enabled: !!courseId,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateLectureRequest) =>
      lecturesApi.createLecture(courseId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLectureRequest }) =>
      lecturesApi.updateLecture(courseId, id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lecturesApi.deleteLecture(courseId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    lectures,
    isLoading,
    error,
    createLecture: createMutation.mutate,
    updateLecture: updateMutation.mutate,
    deleteLecture: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};