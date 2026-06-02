// apps/admin-app/src/shared/types/course.ts
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
  price: number;
  instructorId: string;
  instructorName: string;
  isPublished: boolean;
  enrolledCount: number;
  createdAt: string;
  updatedAt: string;
}