import { create } from 'zustand';

interface CourseFilters {
  search: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface CourseStore {
  filters: CourseFilters;
  setSearch: (search: string) => void;
  setLevel: (level: CourseFilters['level']) => void;
  resetFilters: () => void;
}

const initialFilters: CourseFilters = { search: '' };

export const useCourseStore = create<CourseStore>((set) => ({
  filters: initialFilters,
  setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),
  setLevel: (level) => set((state) => ({ filters: { ...state.filters, level } })),
  resetFilters: () => set({ filters: initialFilters }),
}));