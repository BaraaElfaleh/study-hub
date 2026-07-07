import { create } from 'zustand';

interface AnalyticsFilters {
  startDate: string;
  endDate: string;
}

const today = new Date().toISOString().split('T')[0];
const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const useAnalyticsStore = create<AnalyticsFilters>(() => ({
  startDate: lastMonth,
  endDate: today,
}));