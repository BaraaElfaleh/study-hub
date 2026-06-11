// src/shared/utils/permissions.ts
import type { UserRole } from '../types/auth';

export const checkPermission = (role: UserRole, action: string): boolean => {
  const permissions: Record<UserRole, string[]> = {
    STUDENT: ['enroll', 'view_courses', 'view_own_enrollments'],
    TEACHER: ['manage_courses', 'create_course', 'update_course', 'delete_course', 'view_courses'],
    ADMIN: ['manage_courses', 'manage_users', 'view_analytics'],
  };

  return permissions[role]?.includes(action) ?? false;
};