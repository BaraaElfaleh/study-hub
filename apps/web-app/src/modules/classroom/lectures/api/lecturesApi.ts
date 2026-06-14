// src/modules/classroom/lectures/api/lecturesApi.ts
import client from '../../../../shared/api/client';
import type {
  Lecture,
  CreateLectureRequest,
  UpdateLectureRequest,
} from '../../../../shared/types/classroom';

export const lecturesApi = {
  getLectures: async (courseId: string): Promise<Lecture[]> => {
    const { data } = await client.get<Lecture[]>(`/courses/${courseId}/lectures`);
    return data;
  },

  getLectureById: async (courseId: string, lectureId: string): Promise<Lecture> => {
    const { data } = await client.get<Lecture>(`/courses/${courseId}/lectures/${lectureId}`);
    return data;
  },

  createLecture: async (courseId: string, payload: CreateLectureRequest): Promise<Lecture> => {
    const { data } = await client.post<Lecture>(`/courses/${courseId}/lectures`, payload);
    return data;
  },

  updateLecture: async (
    courseId: string,
    lectureId: string,
    payload: UpdateLectureRequest
  ): Promise<Lecture> => {
    const { data } = await client.patch<Lecture>(
      `/courses/${courseId}/lectures/${lectureId}`,
      payload
    );
    return data;
  },

  deleteLecture: async (courseId: string, lectureId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/lectures/${lectureId}`);
  },
};