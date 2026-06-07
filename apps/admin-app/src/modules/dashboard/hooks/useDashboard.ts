// apps/admin-app/src/modules/dashboard/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import type { DashboardStats, SalesChartData } from '../../../shared/types/report';

// بيانات وهمية مؤقتة
const mockStats: DashboardStats = {
  totalUsers: 3280,
  totalCourses: 24,
  totalRevenue: 145600,
  activeEnrollments: 893,
  newUsersToday: 47,
};

const mockChartData: SalesChartData[] = Array.from({ length: 12 }, (_, i) => ({
  date: `2026-${String(i + 1).padStart(2, '0')}`,
  amount: Math.floor(Math.random() * 20000 + 5000),
}));

const mockLatestUsers = [
  { id: '1', name: 'أحمد محمد', role: 'student', joinedAt: '2026-06-01' },
  { id: '2', name: 'سارة علي', role: 'student', joinedAt: '2026-05-28' },
  { id: '3', name: 'خالد العمري', role: 'teacher', joinedAt: '2026-05-25' },
  { id: '4', name: 'مريم حسين', role: 'student', joinedAt: '2026-05-22' },
  { id: '5', name: 'يوسف ناصر', role: 'teacher', joinedAt: '2026-05-20' },
];

const mockLatestPayments = [
  { id: 'p1', userName: 'أحمد محمد', courseName: 'تطوير الويب', amount: 149, status: 'completed' },
  { id: 'p2', userName: 'سارة علي', courseName: 'تصميم UI/UX', amount: 199, status: 'completed' },
  { id: 'p3', userName: 'كريم محمود', courseName: 'Flutter', amount: 179, status: 'pending' },
  { id: 'p4', userName: 'ليلى حسن', courseName: 'تطوير الويب', amount: 149, status: 'completed' },
  { id: 'p5', userName: 'محمد خالد', courseName: 'تصميم UI/UX', amount: 199, status: 'failed' },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: async () => {
      await delay(500);
      return mockStats;
    },
    staleTime: 60 * 1000,
  });

  const chartQuery = useQuery({
    queryKey: ['admin', 'dashboard', 'chart'],
    queryFn: async () => {
      await delay(700);
      return mockChartData;
    },
    staleTime: 60 * 1000,
  });

  const latestUsersQuery = useQuery({
    queryKey: ['admin', 'dashboard', 'latestUsers'],
    queryFn: async () => {
      await delay(400);
      return mockLatestUsers;
    },
    staleTime: 60 * 1000,
  });

  const latestPaymentsQuery = useQuery({
    queryKey: ['admin', 'dashboard', 'latestPayments'],
    queryFn: async () => {
      await delay(450);
      return mockLatestPayments;
    },
    staleTime: 60 * 1000,
  });

  return {
    stats: statsQuery.data,
    chartData: chartQuery.data,
    latestUsers: latestUsersQuery.data,
    latestPayments: latestPaymentsQuery.data,
    isLoading:
      statsQuery.isLoading ||
      chartQuery.isLoading ||
      latestUsersQuery.isLoading ||
      latestPaymentsQuery.isLoading,
    error:
      statsQuery.error ||
      chartQuery.error ||
      latestUsersQuery.error ||
      latestPaymentsQuery.error,
  };
};