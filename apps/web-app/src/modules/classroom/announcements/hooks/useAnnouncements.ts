// src/modules/classroom/announcements/hooks/useAnnouncements.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementsApi } from '../api/announcementsApi';
import type {
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from '../../../../shared/types/classroom';

export const useAnnouncements = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['announcements', courseId];

  const {
    data: announcements = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => announcementsApi.getAnnouncements(courseId),
    enabled: !!courseId,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateAnnouncementRequest) =>
      announcementsApi.createAnnouncement(courseId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnnouncementRequest }) =>
      announcementsApi.updateAnnouncement(courseId, id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => announcementsApi.deleteAnnouncement(courseId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    data: announcements,
    isLoading,
    error,
    createAnnouncement: createMutation.mutate,
    updateAnnouncement: updateMutation.mutate,
    deleteAnnouncement: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};