import client from '../../../shared/api/client';
import type { Course, CreateCourseRequest, UpdateCourseRequest, CourseQueryParams } from '../../../shared/types/course';

export const coursesApi = {
  fetchCourses: async (params?: CourseQueryParams): Promise<Course[]> => {
    const { data } = await client.get<Course[]>('/courses', { params });
    return data;
  },

  fetchCourseById: async (courseId: string): Promise<Course> => {
    const { data } = await client.get<Course>(`/courses/${courseId}`);
    return data;
  },

  createCourse: async (payload: CreateCourseRequest): Promise<Course> => {
    const { data } = await client.post<Course>('/courses', payload);
    return data;
  },

  updateCourse: async (courseId: string, payload: UpdateCourseRequest): Promise<Course> => {
    const { data } = await client.patch<Course>(`/courses/${courseId}`, payload);
    return data;
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}`);
  },

  enrollInCourse: async (courseId: string, studentId: string): Promise<void> => {
    await client.post(`/courses/${courseId}/enroll`, { studentId });
  },
};