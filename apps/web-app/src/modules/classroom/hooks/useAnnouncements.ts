// apps/web-app/src/modules/classroom/hooks/useAnnouncements.ts
import { useQuery } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptAnnouncement } from '../adapters/classroomAdapter';
import type { Announcement } from '../../../shared/types/classroom';

interface UseAnnouncementsReturn {
  data: Announcement[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useAnnouncements = (courseId: string): UseAnnouncementsReturn => {
  const query = useQuery({
    queryKey: ['classroom', courseId, 'announcements'],
    queryFn: async () => {
      const dtos = await classroomApi.getAnnouncements(courseId);
      return dtos.map(adaptAnnouncement);
    },
    enabled: !!courseId,
    refetchInterval: 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};