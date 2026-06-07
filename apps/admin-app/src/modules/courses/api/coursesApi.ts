// apps/admin-app/src/modules/courses/api/coursesApi.ts
import type { Course } from '../../../shared/types/course';

// بيانات وهمية
const mockCourses: Course[] = [
  { id: '1', title: 'تطوير واجهات الويب بـ React', description: '...', thumbnail: '', level: 'beginner', price: 149, instructorId: '3', instructorName: 'الأستاذ خالد', isPublished: true, enrolledCount: 320, createdAt: '2026-01-10', updatedAt: '2026-05-01' },
  { id: '2', title: 'تصميم تجربة المستخدم', description: '...', thumbnail: '', level: 'intermediate', price: 199, instructorId: '5', instructorName: 'يوسف ناصر', isPublished: true, enrolledCount: 210, createdAt: '2026-02-15', updatedAt: '2026-05-10' },
  { id: '3', title: 'تطبيقات الموبايل بـ Flutter', description: '...', thumbnail: '', level: 'beginner', price: 179, instructorId: '3', instructorName: 'الأستاذ خالد', isPublished: false, enrolledCount: 90, createdAt: '2026-03-20', updatedAt: '2026-05-05' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const coursesApi = {
  fetchCourses: async (params?: { search?: string; level?: string }): Promise<Course[]> => {
    await delay(600);
    let filtered = [...mockCourses];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(c => c.title.toLowerCase().includes(s));
    }
    if (params?.level && params.level !== 'all') {
      filtered = filtered.filter(c => c.level === params.level);
    }
    return filtered;
  },

  createCourse: async (data: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount'>): Promise<Course> => {
    await delay(500);
    const newCourse: Course = {
      ...data,
      id: String(Date.now()),
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCourses.push(newCourse);
    return newCourse;
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    await delay(500);
    const idx = mockCourses.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('الكورس غير موجود');
    mockCourses[idx] = { ...mockCourses[idx], ...data, updatedAt: new Date().toISOString() };
    return mockCourses[idx];
  },

  deleteCourse: async (id: string): Promise<void> => {
    await delay(500);
    const idx = mockCourses.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('الكورس غير موجود');
    mockCourses.splice(idx, 1);
  },
};