import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analyticsApi';
import { useAnalyticsStore } from '../store/analyticsStore';

export const useAnalytics = () => {
  const { startDate, endDate } = useAnalyticsStore();
  return useQuery({
    queryKey: ['admin-analytics', startDate, endDate],
    queryFn: () => analyticsApi.getAnalytics({ startDate, endDate }),
    enabled: !!startDate && !!endDate,
  });
};