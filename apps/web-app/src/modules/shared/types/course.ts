export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CourseLevel;
  price: number;
  instructorId: string; // Foreign key -> User (teacher)
  instructorName?: string; // Denormalized for display
  createdAt: string;
  updatedAt: string;
}