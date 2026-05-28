import type { CourseDTO, EnrollmentDTO } from '../dtos/courseDto';
import { mockCourses } from '../../../mock/data';

// دالة لتحويل Course (الموجود في mock) إلى CourseDTO
const mapToDTO = (course: any): CourseDTO => ({
  ...course,
  instructor_id: course.instructorId,
  instructor_name: course.instructorName, // تأكد من مطابقة الاسم في ملف البيانات
  created_at: course.createdAt,
  updated_at: course.updatedAt,
});

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const coursesApi = {
  fetchCourses: async (params?: { search?: string; level?: string }): Promise<CourseDTO[]> => {
    await delay(500);
    let filtered = [...mockCourses];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((c) => c.title.toLowerCase().includes(s));
    }
    if (params?.level) {
      filtered = filtered.filter((c) => c.level === params.level);
    }
    // نقوم بتحويل النتائج قبل الإرجاع
    return filtered.map(mapToDTO);
  },

  fetchCourseById: async (courseId: string): Promise<CourseDTO> => {
    await delay(400);
    const course = mockCourses.find((c) => c.id === courseId);
    if (!course) throw new Error('الدورة غير موجودة');
    return mapToDTO(course);
  },

  enrollInCourse: async (courseId: string): Promise<EnrollmentDTO> => {
    await delay(800);
    return {
      id: `enroll-${Date.now()}`,
      user_id: 'user-001',
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      status: 'active',
    };
  },

  createCourse: async (payload: Omit<CourseDTO, 'id'>): Promise<CourseDTO> => {
    await delay(600);
    // عند الإنشاء، نقوم بالتحويل العكسي أو الاحتفاظ بالـ DTO
    const newCourse: CourseDTO = { id: `course-${Date.now()}`, ...payload };
    mockCourses.push(newCourse as any); // استخدام as any لتجاوز التعارض مع النوع الأصلي لـ mockCourses
    return newCourse;
  },

  updateCourse: async (courseId: string, updates: Partial<CourseDTO>): Promise<CourseDTO> => {
    await delay(400);
    const index = mockCourses.findIndex((c) => c.id === courseId);
    if (index === -1) throw new Error('الدورة غير موجودة');
    
    mockCourses[index] = { ...mockCourses[index], ...updates } as any;
    return mapToDTO(mockCourses[index]);
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await delay(400);
    const index = mockCourses.findIndex((c) => c.id === courseId);
    if (index !== -1) mockCourses.splice(index, 1);
  },
};