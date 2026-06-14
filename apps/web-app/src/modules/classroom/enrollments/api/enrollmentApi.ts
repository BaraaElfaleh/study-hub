// src/modules/classroom/enrollments/api/enrollmentApi.ts
import client from '../../../../shared/api/client';

// النوع المؤقت للتسجيل (يمكنك نقله لاحقاً إلى shared/types)
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
}

export interface EnrollStudentRequest {
  studentId: string;
  paymentId?: string;
}

export const enrollmentApi = {
  // جلب المسجلين في كورس (للمعلم/المشرف)
  getCourseEnrollments: async (courseId: string) => {
    const { data } = await client.get(`/courses/${courseId}/enrollments`);
    return data;
  },

  // تسجيل طالب في الكورس (المعلم/الأدمن)
  enrollStudent: async (courseId: string, studentId: string, paymentId?: string) => {
    await client.post(`/courses/${courseId}/enroll`, {
      studentId,
      paymentId,
    });
  },

  // إلغاء تسجيل طالب (المعلم/الأدمن)
  unenrollStudent: async (courseId: string, studentId: string) => {
    await client.delete(`/courses/${courseId}/enroll/${studentId}`);
  },

  // الكورسات التي سجل فيها الطالب الحالي
  getMyEnrollments: async () => {
    const { data } = await client.get('/courses/enrolled');
    return data;
  },

  // تحديث تقدم طالب (اختياري، قد لا يكون متاحاً بعد)
  updateProgress: async (enrollmentId: string, progress: number) => {
    const { data } = await client.patch(`/enrollments/${enrollmentId}/progress`, { progress });
    return data;
  },
};