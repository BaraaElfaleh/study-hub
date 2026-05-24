export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: EnrollmentStatus;
}