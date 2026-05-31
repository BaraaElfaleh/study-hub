/**
 * Courses API Service
 * تمت معالجة أخطاء الـ Import وتوحيد المسارات
 */

// تأكد أن اسم الملف هو baseApiService.ts (حرف s صغيرة)
import { BaseApiService, addDelay } from '../../../shared/api/baseApiService';
import type {
  CourseDTO,
  EnrollmentDTO,
  FetchCoursesParams,
  CreateCoursePayload,
  UpdateCoursePayload,
  EnrollmentStatusEnum, // استيراد النوع الجديد
} from '../dtos/courseDto';
import { mockCoursesData } from './mock';

class CoursesApiService extends BaseApiService {
  
  async fetchCourses(params?: FetchCoursesParams): Promise<CourseDTO[]> {
    await addDelay(500);
    let filtered = [...mockCoursesData];

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchLower)
      );
    }

    if (params?.level) {
      // التأكد من تطابق النوع
      filtered = filtered.filter((course) => course.level === params.level);
    }

    return filtered;
  }

  async fetchCourseById(courseId: string): Promise<CourseDTO> {
    await addDelay(400);
    const course = mockCoursesData.find((c) => c.id === courseId);

    if (!course) {
      throw new Error(`الدورة ${courseId} غير موجودة`);
    }

    return course;
  }

  async enrollInCourse(courseId: string): Promise<EnrollmentDTO> {
    await addDelay(800);
    return {
      id: `enroll-${Date.now()}`,
      user_id: 'user-001',
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      // استخدام النوع المعتمد بدلاً من 'active' كـ String
      status: 'active' as EnrollmentStatusEnum, 
    };
  }

  async createCourse(payload: CreateCoursePayload): Promise<CourseDTO> {
    await addDelay(600);
    const newCourse: CourseDTO = {
      id: `course-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockCoursesData.push(newCourse);
    return newCourse;
  }

  async updateCourse(
    courseId: string,
    updates: UpdateCoursePayload
  ): Promise<CourseDTO> {
    await addDelay(400);
    const index = mockCoursesData.findIndex((c) => c.id === courseId);

    if (index === -1) {
      throw new Error(`الدورة ${courseId} غير موجودة`);
    }

    mockCoursesData[index] = {
      ...mockCoursesData[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return mockCoursesData[index];
  }

  async deleteCourse(courseId: string): Promise<void> {
    await addDelay(400);
    const index = mockCoursesData.findIndex((c) => c.id === courseId);

    if (index !== -1) {
      mockCoursesData.splice(index, 1);
    }
  }
}

export const coursesApi = new CoursesApiService();