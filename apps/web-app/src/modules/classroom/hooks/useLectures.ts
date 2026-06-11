import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptLecture } from '../adapters/classroomAdapter';
import type { CreateLectureRequest, UpdateLectureRequest } from '../../../shared/types/classroom';

export const useLectures = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', courseId, 'lectures'];

  const lecturesQuery = useQuery({
    queryKey,
    queryFn: () => classroomApi.getLectures(courseId).then(dtos => dtos.map(adaptLecture)),
    enabled: !!courseId,
  });

  const createMutation = useMutation({
    mutationFn: (dto: CreateLectureRequest) => classroomApi.createLecture(courseId, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ lectureId, data }: { lectureId: string; data: UpdateLectureRequest }) =>
      classroomApi.updateLecture(courseId, lectureId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: (lectureId: string) => classroomApi.deleteLecture(courseId, lectureId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    lectures: lecturesQuery.data,
    isLoading: lecturesQuery.isLoading,
    error: lecturesQuery.error,
    createLecture: createMutation.mutate,
    updateLecture: updateMutation.mutate,
    deleteLecture: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};