// apps/admin-app/src/shared/types/report.ts
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeEnrollments: number;
  newUsersToday: number;
}

export interface SalesChartData {
  date: string;
  amount: number;
}