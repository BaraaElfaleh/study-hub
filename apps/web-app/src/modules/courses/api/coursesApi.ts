import type {
  CourseDTO,
  EnrollmentDTO,
  FetchCoursesParams,
  CreateCoursePayload,
  UpdateCoursePayload,
} from '../dtos/courseDto';
import { mockCoursesData } from './mock';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const coursesApi = {
  fetchCourses: async (params?: FetchCoursesParams): Promise<CourseDTO[]> => {
    await delay(500);
    let filtered = [...mockCoursesData];
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter((c) => c.title.toLowerCase().includes(searchLower));
    }
    if (params?.level) {
      filtered = filtered.filter((c) => c.level === params.level);
    }
    return filtered;
  },

  fetchCourseById: async (courseId: string): Promise<CourseDTO> => {
    await delay(400);
    const course = mockCoursesData.find((c) => c.id === courseId);
    if (!course) throw new Error(`الدورة ${courseId} غير موجودة`);
    return course;
  },

  enrollInCourse: async (courseId: string): Promise<EnrollmentDTO> => {
    await delay(800);
    return {
      id: `enroll-${Date.now()}`,
      user_id: 'user-001',
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      status: 'active', // هذا يتوافق مع EnrollmentStatus
    };
  },

  createCourse: async (payload: CreateCoursePayload): Promise<CourseDTO> => {
    await delay(600);
    const newCourse: CourseDTO = {
      id: `course-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockCoursesData.push(newCourse);
    return newCourse;
  },

  updateCourse: async (courseId: string, updates: UpdateCoursePayload): Promise<CourseDTO> => {
    await delay(400);
    const index = mockCoursesData.findIndex((c) => c.id === courseId);
    if (index === -1) throw new Error(`الدورة ${courseId} غير موجودة`);
    mockCoursesData[index] = { ...mockCoursesData[index], ...updates, updated_at: new Date().toISOString() };
    return mockCoursesData[index];
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await delay(400);
    const index = mockCoursesData.findIndex((c) => c.id === courseId);
    if (index !== -1) mockCoursesData.splice(index, 1);
  },
};