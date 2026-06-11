export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: CourseLevel;
  thumbnail: string;
  isActive: boolean;
  teacherId: string;
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  title: string;
  description?: string;
  teacherId?: string;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export interface EnrollStudentRequest {
  studentId: string;
  paymentId?: string;
}

export interface CourseQueryParams {
  search?: string;
  isActive?: boolean;
  teacherId?: string;
  page?: number;
  limit?: number;
}