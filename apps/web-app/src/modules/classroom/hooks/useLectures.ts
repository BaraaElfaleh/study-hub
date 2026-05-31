import { useQuery } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptLecture } from '../adapters/classroomAdapter';
import type { Lecture } from "../dtos/classroomDto";

interface UseLecturesReturn {
  data: Lecture[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useLectures = (courseId: string): UseLecturesReturn => {
  const query = useQuery({
    queryKey: ['classroom', courseId, 'lectures'],
    queryFn: async () => {
      const dtos = await classroomApi.getLectures(courseId);
      return dtos.map(adaptLecture);
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};