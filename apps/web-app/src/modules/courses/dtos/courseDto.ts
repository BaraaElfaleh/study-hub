/**
 * Courses Module Type Definitions
 * تم تعديل الـ Enum والـ Interfaces لتتطابق مع النوع الرئيسي Course
 */

import type { Course as CourseModel, CourseLevel } from '../../../shared/types/course';

// ==================== Enum Replacement ====================

export const CourseLevelEnum = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

// ربط الـ Enum بالنوع الرئيسي
export type CourseLevelEnum = CourseLevel;

export const EnrollmentStatusEnum = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type EnrollmentStatusEnum = typeof EnrollmentStatusEnum[keyof typeof EnrollmentStatusEnum];

// ==================== DTO Types (Server responses) ====================

export interface CourseDTO {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevelEnum;
  price: number;
  instructor_id: string;
  instructor_name: string;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentDTO {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  status: EnrollmentStatusEnum;
}

// ==================== Domain Model Types (Frontend) ====================

// الاعتماد كلياً على النوع الرئيسي
export type Course = CourseModel;

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: EnrollmentStatusEnum;
}

// ==================== Request Types ====================

export interface FetchCoursesParams {
  search?: string;
  level?: CourseLevelEnum;
  page?: number;
  limit?: number;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevelEnum;
  price: number;
  instructor_id: string;
  instructor_name: string;
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  level?: CourseLevelEnum;
  price?: number;
}

// ==================== API Response Types ====================

export interface CoursesApiResponse {
  data: CourseDTO[];
  total: number;
  page: number;
  limit: number;
}

export interface CourseDetailApiResponse {
  data: CourseDTO;
}

export interface EnrollmentApiResponse {
  data: EnrollmentDTO;
}

// ==================== Hooks & Store Types ====================

export interface MutationState {
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseCourseReturn {
  courses: Course[] | undefined;
  isLoadingCourses: boolean;
  coursesError: Error | null;
  useCourseDetail: (courseId: string) => UseCourseDetailReturn;
  enrollInCourse: (courseId: string) => void;
  createCourse: (payload: CreateCoursePayload) => void;
  updateCourse: (courseId: string, updates: UpdateCoursePayload) => void;
  deleteCourse: (courseId: string) => void;
  enrollState: MutationState;
  createState: MutationState;
  updateState: MutationState;
  deleteState: MutationState;
}

export interface UseCourseDetailReturn {
  data: Course | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface CourseFilters {
  search: string;
  level: CourseLevelEnum | null;
}

export interface CourseStoreState {
  filters: CourseFilters;
  setSearch: (search: string) => void;
  setLevel: (level: CourseLevelEnum | null) => void;
  resetFilters: () => void;
}