import { useQuery } from '@tanstack/react-query';
import classroomApi from '../api/classroomApi';
import { adaptAnnouncement } from '../adapters/classroomAdapter';

export const useAnnouncements = (classroomId: string) => {
  return useQuery({
    queryKey: ['classroom', classroomId, 'announcements'],
    queryFn: async () => {
      const dtos = await classroomApi.getAnnouncements(classroomId);
      return dtos.map(adaptAnnouncement);
    },
    enabled: !!classroomId,
    refetchInterval: 60 * 1000, // تحديث كل دقيقة
  });
};