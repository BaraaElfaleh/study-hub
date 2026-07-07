export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export interface User { id: string; email: string; firstName: string; lastName: string; role: UserRole; isActive: boolean; createdAt: string; }