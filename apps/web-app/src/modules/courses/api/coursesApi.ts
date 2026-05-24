// src/modules/courses/api/coursesApi.ts
import type { Course } from '../../shared/types/course';
import type { Enrollment } from '../../shared/types/enrollment';
import { mockCourses } from '../../../mock/data';

// محاكاة تأخير الشبكة
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const coursesApi = {
  fetchCourses: async (params?: { search?: string; level?: string }): Promise<Course[]> => {
    await delay(800); // محاكاة تحميل
    let filtered = [...mockCourses];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((c) => c.title.toLowerCase().includes(s));
    }
    if (params?.level) {
      filtered = filtered.filter((c) => c.level === params.level);
    }
    return filtered;
  },

  fetchCourseById: async (courseId: string): Promise<Course> => {
    await delay(600);
    const course = mockCourses.find((c) => c.id === courseId);
    if (!course) throw new Error('الدورة غير موجودة');
    return course;
  },

  enrollInCourse: async (courseId: string): Promise<Enrollment> => {
    await delay(1000);
    return {
      id: `enroll-${Date.now()}`,
      userId: 'user-001',
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };
  },

  createCourse: async (payload: Omit<Course, 'id'>): Promise<Course> => {
    await delay(800);
    const newCourse: Course = { id: `course-${Date.now()}`, ...payload };
    mockCourses.push(newCourse);
    return newCourse;
  },

  updateCourse: async (courseId: string, updates: Partial<Course>): Promise<Course> => {
    await delay(500);
    const index = mockCourses.findIndex((c) => c.id === courseId);
    if (index === -1) throw new Error('الدورة غير موجودة');
    mockCourses[index] = { ...mockCourses[index], ...updates };
    return mockCourses[index];
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await delay(500);
    const index = mockCourses.findIndex((c) => c.id === courseId);
    if (index !== -1) mockCourses.splice(index, 1);
  },
};