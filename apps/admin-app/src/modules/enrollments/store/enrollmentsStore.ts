import { create } from 'zustand';

interface EnrollmentsStore {
  selectedCourseId: string;
  isEnrollFormOpen: boolean;
  setSelectedCourseId: (id: string) => void;
  openEnrollForm: () => void;
  closeEnrollForm: () => void;
}

export const useEnrollmentsStore = create<EnrollmentsStore>((set) => ({
  selectedCourseId: '',
  isEnrollFormOpen: false,
  setSelectedCourseId: (id) => set({ selectedCourseId: id }),
  openEnrollForm: () => set({ isEnrollFormOpen: true }),
  closeEnrollForm: () => set({ isEnrollFormOpen: false }),
}));