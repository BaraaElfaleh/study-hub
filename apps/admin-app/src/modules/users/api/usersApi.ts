// apps/admin-app/src/modules/users/api/usersApi.ts
import type { User } from '../../../shared/types/user';

// بيانات وهمية مؤقتة
const mockUsers: User[] = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'student', isActive: true, joinedAt: '2026-01-15' },
  { id: '2', name: 'سارة علي', email: 'sara@example.com', role: 'student', isActive: true, joinedAt: '2026-02-20' },
  { id: '3', name: 'الأستاذ خالد', email: 'khaled@alnoon.com', role: 'teacher', isActive: true, joinedAt: '2025-11-01' },
  { id: '4', name: 'مريم حسين', email: 'mariam@example.com', role: 'student', isActive: false, joinedAt: '2026-03-10' },
  { id: '5', name: 'يوسف ناصر', email: 'yousef@example.com', role: 'teacher', isActive: true, joinedAt: '2025-09-15' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const usersApi = {
  fetchUsers: async (params?: { search?: string; role?: string }): Promise<User[]> => {
    await delay(600);
    let filtered = [...mockUsers];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    if (params?.role && params.role !== 'all') {
      filtered = filtered.filter(u => u.role === params.role);
    }
    return filtered;
  },

  fetchUserById: async (userId: string): Promise<User> => {
    await delay(400);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('المستخدم غير موجود');
    return user;
  },

  updateUser: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('المستخدم غير موجود');
    mockUsers[index] = { ...mockUsers[index], ...updates };
    return mockUsers[index];
  },

  deleteUser: async (userId: string): Promise<void> => {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('المستخدم غير موجود');
    mockUsers.splice(index, 1);
  },
};