// apps/admin-app/src/modules/courses/store/coursesStore.ts
import { create } from 'zustand';

interface CoursesStore {
  search: string;
  levelFilter: string;
  setSearch: (val: string) => void;
  setLevelFilter: (level: string) => void;
}

export const useCoursesStore = create<CoursesStore>((set) => ({
  search: '',
  levelFilter: 'all',
  setSearch: (search) => set({ search }),
  setLevelFilter: (level) => set({ levelFilter: level }),
}));