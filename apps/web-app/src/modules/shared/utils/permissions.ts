// src/shared/utils/permissions.ts
import type { UserRole } from '../types/user';

export const checkPermission = (role: UserRole, action: string): boolean => {
  const permissions: Record<UserRole, string[]> = {
    student: ['enroll', 'view_courses', 'view_own_enrollments'],
    teacher: ['manage_courses', 'create_course', 'update_course', 'delete_course', 'view_courses'],
  };

  return permissions[role]?.includes(action) ?? false;
};