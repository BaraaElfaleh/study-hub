// src/modules/courses/api/coursesApi.ts
import client from '../../../shared/api/client';
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseQueryParams,
  EnrollStudentRequest,
} from '../../../shared/types/course';

/**
 * دالة مساعدة لاستخراج المصفوفة من استجابة قد تكون كائنًا يحتوي على data أو results
 */
const extractArray = (responseData: any): any[] => {
  if (Array.isArray(responseData)) return responseData;
  if (responseData?.data && Array.isArray(responseData.data)) return responseData.data;
  if (responseData?.results && Array.isArray(responseData.results)) return responseData.results;
  return []; // إذا لم نجد مصفوفة نعيد مصفوفة فارغة لتفادي الأعطال
};

export const coursesApi = {
  fetchCourses: async (params?: CourseQueryParams): Promise<Course[]> => {
    const { data } = await client.get<any>('/courses', { params });
    console.log('📥 /courses response:', data);
    return extractArray(data);
  },

  fetchCourseById: async (courseId: string): Promise<Course> => {
    const { data } = await client.get<Course>(`/courses/${courseId}`);
    // عادة تفاصيل الكورس تكون كائنًا مباشرًا
    return data;
  },

  fetchEnrolledCourses: async (params?: { page?: number; limit?: number }): Promise<Course[]> => {
    const { data } = await client.get<any>('/courses/enrolled', { params });
    return extractArray(data);
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

  enrollStudent: async (courseId: string, body: EnrollStudentRequest): Promise<void> => {
    await client.post(`/courses/${courseId}/enroll`, body);
  },

  unenrollStudent: async (courseId: string, studentId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/enroll/${studentId}`);
  },

  assignTeacher: async (courseId: string, teacherId: string): Promise<void> => {
    await client.patch(`/courses/${courseId}/assign-teacher`, { teacherId });
  },
};