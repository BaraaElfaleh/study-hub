// src/modules/classroom/announcements/api/announcementsApi.ts
import client from '../../../../shared/api/client';
import type {
  Announcement,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from '../../../../shared/types/classroom';

export const announcementsApi = {
  getAnnouncements: async (courseId: string): Promise<Announcement[]> => {
    const { data } = await client.get<Announcement[]>(`/courses/${courseId}/announcements`);
    return data;
  },

  createAnnouncement: async (courseId: string, payload: CreateAnnouncementRequest): Promise<Announcement> => {
    const { data } = await client.post<Announcement>(`/courses/${courseId}/announcements`, payload);
    return data;
  },

  updateAnnouncement: async (
    courseId: string,
    announcementId: string,
    payload: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    const { data } = await client.patch<Announcement>(`/courses/${courseId}/announcements/${announcementId}`, payload);
    return data;
  },

  deleteAnnouncement: async (courseId: string, announcementId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/announcements/${announcementId}`);
  },
};