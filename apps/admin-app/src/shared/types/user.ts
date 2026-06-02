// apps/admin-app/src/shared/types/user.ts
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  enrolledCourses?: number;
  joinedAt: string;
}