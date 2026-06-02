import type { CourseLevel } from '../../../shared/types/course';
import type { EnrollmentStatus } from '../../../shared/types/enrollment';

// ==================== API DTOs (snake_case) ====================
export interface CourseDTO {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
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
  status: EnrollmentStatus;
}

// ==================== Request Params ====================
export interface FetchCoursesParams {
  search?: string;
  level?: CourseLevel;
  page?: number;
  limit?: number;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
  price: number;
  instructor_id: string;
  instructor_name: string;
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  level?: CourseLevel;
  price?: number;
}

// ==================== Store/Hook Utility Types ====================
export interface MutationState {
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface CourseFilters {
  search: string;
  level: CourseLevel | null;
}

// ==================== Hook Return Types ====================
import type { Course } from '../../../shared/types/course';

export interface UseCourseDetailReturn {
  data: Course | undefined;
  isLoading: boolean;
  error: Error | null;
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