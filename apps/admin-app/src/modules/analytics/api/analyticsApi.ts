import client from '../../../shared/api/client';
import type { AnalyticsSummary } from '../../../shared/types/analytics';

export const analyticsApi = {
  getAnalytics: async (params?: { startDate?: string; endDate?: string }): Promise<AnalyticsSummary> => {
    const { data } = await client.get<AnalyticsSummary>('/admin/analytics', { params });
    return data;
  },
};