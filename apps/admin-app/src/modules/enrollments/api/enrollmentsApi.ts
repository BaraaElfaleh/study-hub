import client from '../../../shared/api/client';

export const enrollmentsApi = {
  getCourseEnrollments: async (courseId: string, params?: { page?: number; limit?: number }) => {
    const { data } = await client.get(`/courses/${courseId}/enrollments`, { params });
    return data; // { data: Enrollment[], meta: {...} }
  },
  enrollStudent: async (courseId: string, studentId: string) => {
    await client.post(`/admin/courses/${courseId}/enroll`, { studentId });
  },
  unenrollStudent: async (courseId: string, studentId: string) => {
    await client.delete(`/admin/courses/${courseId}/unenroll/${studentId}`);
  },
  updateProgress: async (enrollmentId: string, progress: number) => {
    await client.patch(`/enrollments/${enrollmentId}/progress`, { progress });
  },
};