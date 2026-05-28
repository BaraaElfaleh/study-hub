export interface CourseDTO {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
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
  status: 'active' | 'completed' | 'cancelled';
}