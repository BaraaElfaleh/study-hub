import { useQuery } from '@tanstack/react-query';
import classroomApi from '../api/classroomApi';
import { adaptLecture } from '../adapters/classroomAdapter';

export const useLectures = (classroomId: string) => {
  return useQuery({
    queryKey: ['classroom', classroomId, 'lectures'],
    queryFn: async () => {
      const dtos = await classroomApi.getLectures(classroomId);
      return dtos.map(adaptLecture);
    },
    enabled: !!classroomId,
    staleTime: 5 * 60 * 1000,
  });
};