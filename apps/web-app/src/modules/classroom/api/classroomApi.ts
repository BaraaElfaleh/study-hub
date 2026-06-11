import client from '../../../shared/api/client';
import type {
  Lecture,
  CreateLectureRequest,
  UpdateLectureRequest,
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
  Announcement,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
  ChatMessage,
  SendMessageRequest,
  Submission,
  SubmitAssignmentRequest,
} from '../../../shared/types/classroom';

export const classroomApi = {
  // ─── المحاضرات ───
  getLectures: async (courseId: string): Promise<Lecture[]> => {
    const { data } = await client.get<Lecture[]>(`/courses/${courseId}/lectures`);
    return data;
  },
  createLecture: async (courseId: string, payload: CreateLectureRequest): Promise<Lecture> => {
    const { data } = await client.post<Lecture>(`/courses/${courseId}/lectures`, payload);
    return data;
  },
  updateLecture: async (courseId: string, lectureId: string, payload: UpdateLectureRequest): Promise<Lecture> => {
    const { data } = await client.patch<Lecture>(`/courses/${courseId}/lectures/${lectureId}`, payload);
    return data;
  },
  deleteLecture: async (courseId: string, lectureId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/lectures/${lectureId}`);
  },

  // ─── الواجبات ───
  getAssignments: async (courseId: string): Promise<Assignment[]> => {
    const { data } = await client.get<Assignment[]>(`/courses/${courseId}/assignments`);
    return data;
  },
  createAssignment: async (courseId: string, payload: CreateAssignmentRequest): Promise<Assignment> => {
    const { data } = await client.post<Assignment>(`/courses/${courseId}/assignments`, payload);
    return data;
  },
  updateAssignment: async (courseId: string, assignmentId: string, payload: UpdateAssignmentRequest): Promise<Assignment> => {
    const { data } = await client.patch<Assignment>(`/courses/${courseId}/assignments/${assignmentId}`, payload);
    return data;
  },
  deleteAssignment: async (courseId: string, assignmentId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/assignments/${assignmentId}`);
  },

  // ─── التسليمات ───
  submitAssignment: async (courseId: string, assignmentId: string, payload: SubmitAssignmentRequest): Promise<Submission> => {
    const { data } = await client.post<Submission>(`/courses/${courseId}/assignments/${assignmentId}/submit`, payload);
    return data;
  },

  // ─── الإعلانات ───
  getAnnouncements: async (courseId: string): Promise<Announcement[]> => {
    const { data } = await client.get<Announcement[]>(`/courses/${courseId}/announcements`);
    return data;
  },
  createAnnouncement: async (courseId: string, payload: CreateAnnouncementRequest): Promise<Announcement> => {
    const { data } = await client.post<Announcement>(`/courses/${courseId}/announcements`, payload);
    return data;
  },
  updateAnnouncement: async (courseId: string, announcementId: string, payload: UpdateAnnouncementRequest): Promise<Announcement> => {
    const { data } = await client.patch<Announcement>(`/courses/${courseId}/announcements/${announcementId}`, payload);
    return data;
  },
  deleteAnnouncement: async (courseId: string, announcementId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/announcements/${announcementId}`);
  },

  // ─── المحادثة ───
  getChatMessages: async (courseId: string): Promise<ChatMessage[]> => {
    const { data } = await client.get<ChatMessage[]>(`/courses/${courseId}/chat`);
    return data;
  },
  sendChatMessage: async (courseId: string, payload: SendMessageRequest): Promise<ChatMessage> => {
    const { data } = await client.post<ChatMessage>(`/courses/${courseId}/chat`, payload);
    return data;
  },

  // ─── التسجيل والتقدم ───
  getEnrollments: async (courseId: string) => {
    const { data } = await client.get(`/courses/${courseId}/enrollments`);
    return data;
  },
  enrollStudent: async (courseId: string, studentId: string) => {
    await client.post(`/admin/courses/${courseId}/enroll`, { studentId });
  },
  unenrollStudent: async (courseId: string, studentId: string) => {
    await client.delete(`/admin/courses/${courseId}/unenroll/${studentId}`);
  },
  getMyEnrollments: async () => {
    const { data } = await client.get('/my-enrollments');
    return data;
  },
  updateProgress: async (enrollmentId: string, progress: number) => {
    const { data } = await client.patch(`/enrollments/${enrollmentId}/progress`, { progress });
    return data;
  },
};