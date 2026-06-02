export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
  price: number;
  instructorId: string;
  instructorName?: string;
  createdAt: string;
  updatedAt: string;
}