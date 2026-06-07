// apps/admin-app/src/modules/reports/hooks/useReports.ts
import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api/reportsApi';

export const useReports = () => {
  const chartQuery = useQuery({
    queryKey: ['admin', 'reports', 'chart'],
    queryFn: reportsApi.fetchChartData,
    staleTime: 60 * 1000,
  });

  const topCoursesQuery = useQuery({
    queryKey: ['admin', 'reports', 'topCourses'],
    queryFn: reportsApi.fetchTopCourses,
    staleTime: 60 * 1000,
  });

  const activeUsersQuery = useQuery({
    queryKey: ['admin', 'reports', 'activeUsers'],
    queryFn: reportsApi.fetchActiveUsers,
    staleTime: 60 * 1000,
  });

  return {
    chartData: chartQuery.data ?? [],
    topCourses: topCoursesQuery.data ?? [],
    activeUsers: activeUsersQuery.data ?? [],
    isLoading: chartQuery.isLoading || topCoursesQuery.isLoading || activeUsersQuery.isLoading,
    error: chartQuery.error || topCoursesQuery.error || activeUsersQuery.error,
  };
};