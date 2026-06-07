// apps/admin-app/src/modules/reports/api/reportsApi.ts
import type { SalesChartData } from '../../../shared/types/report';

interface TopCourse {
  title: string;
  enrollments: number;
}

interface ActiveUser {
  name: string;
  role: 'student' | 'teacher';
  lastActive: string;
}

const mockChartData: SalesChartData[] = Array.from({ length: 12 }, (_, i) => ({
  date: `2026-${String(i + 1).padStart(2, '0')}`,
  amount: Math.floor(Math.random() * 20000 + 5000),
}));

const mockTopCourses: TopCourse[] = [
  { title: 'تطوير الويب', enrollments: 320 },
  { title: 'تصميم UI/UX', enrollments: 210 },
  { title: 'Flutter', enrollments: 90 },
  { title: 'تحليل البيانات', enrollments: 65 },
  { title: 'الذكاء الاصطناعي', enrollments: 48 },
];

const mockActiveUsers: ActiveUser[] = [
  { name: 'أحمد محمد', role: 'student', lastActive: '2026-06-03T10:30:00Z' },
  { name: 'الأستاذ خالد', role: 'teacher', lastActive: '2026-06-03T09:15:00Z' },
  { name: 'سارة علي', role: 'student', lastActive: '2026-06-02T22:10:00Z' },
  { name: 'يوسف ناصر', role: 'teacher', lastActive: '2026-06-02T18:45:00Z' },
  { name: 'مريم حسين', role: 'student', lastActive: '2026-06-02T15:00:00Z' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const reportsApi = {
  fetchChartData: async (): Promise<SalesChartData[]> => {
    await delay(700);
    return mockChartData;
  },

  fetchTopCourses: async (): Promise<TopCourse[]> => {
    await delay(500);
    return mockTopCourses;
  },

  fetchActiveUsers: async (): Promise<ActiveUser[]> => {
    await delay(500);
    return mockActiveUsers;
  },
};