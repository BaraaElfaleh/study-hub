import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptLecture } from '../adapters/classroomAdapter';
import type { Lecture } from "../dtos/classroomDto";

interface UseLecturesReturn {
  data: Lecture[] | undefined;
  isLoading: boolean;
  error: Error | null;
  addLecture: (data: { title: string; video_url?: string; order: number }) => void;
  isAdding: boolean;
  updateLecture: (lectureId: string, updates: Partial<Pick<Lecture, 'title' | 'videoUrl' | 'order'>>) => void;
  isUpdating: boolean;
  deleteLecture: (lectureId: string) => void;
  isDeleting: boolean;
}

export const useLectures = (courseId: string): UseLecturesReturn => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', courseId, 'lectures'];

  const lecturesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getLectures(courseId);
      return dtos.map(adaptLecture);
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  const addLectureMutation = useMutation({
    mutationFn: (data: { title: string; video_url?: string; order: number }) =>
      classroomApi.addLecture(courseId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateLectureMutation = useMutation({
    mutationFn: ({ lectureId, updates }: { lectureId: string; updates: Partial<Pick<Lecture, 'title' | 'videoUrl' | 'order'>> }) =>
      classroomApi.updateLecture(lectureId, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteLectureMutation = useMutation({
    mutationFn: (lectureId: string) => classroomApi.deleteLecture(lectureId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    data: lecturesQuery.data,
    isLoading: lecturesQuery.isLoading,
    error: lecturesQuery.error,
    addLecture: addLectureMutation.mutate,
    isAdding: addLectureMutation.isPending,
    updateLecture: (lectureId, updates) => updateLectureMutation.mutate({ lectureId, updates }),
    isUpdating: updateLectureMutation.isPending,
    deleteLecture: deleteLectureMutation.mutate,
    isDeleting: deleteLectureMutation.isPending,
  };
};