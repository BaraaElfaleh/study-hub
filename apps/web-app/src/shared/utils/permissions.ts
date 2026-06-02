// src/shared/utils/permissions.ts
import type { UserRole } from '../types/auth';

export const checkPermission = (role: UserRole, action: string): boolean => {
  const permissions: Record<UserRole, string[]> = {
    student: ['enroll', 'view_courses', 'view_own_enrollments'],
    teacher: ['manage_courses', 'create_course', 'update_course', 'delete_course', 'view_courses'],
    admin: ['view', 'create', 'edit', 'delete'],
  };

  return permissions[role]?.includes(action) ?? false;
};