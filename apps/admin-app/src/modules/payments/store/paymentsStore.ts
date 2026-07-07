import { create } from 'zustand';

interface PaymentsFilters {
  page: number;
  limit: number;
  courseId: string;
  status: string;
}

interface PaymentsStore {
  filters: PaymentsFilters;
  setPage: (page: number) => void;
  setCourseId: (courseId: string) => void;
  setStatus: (status: string) => void;
}

export const usePaymentsStore = create<PaymentsStore>((set) => ({
  filters: { page: 1, limit: 10, courseId: '', status: '' },
  setPage: (page) => set((s) => ({ filters: { ...s.filters, page } })),
  setCourseId: (courseId) => set((s) => ({ filters: { ...s.filters, courseId, page: 1 } })),
  setStatus: (status) => set((s) => ({ filters: { ...s.filters, status, page: 1 } })),
}));