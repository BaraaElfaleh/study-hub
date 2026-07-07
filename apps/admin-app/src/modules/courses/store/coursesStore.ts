import { create } from "zustand";
interface CoursesStore {
  filters: { page: number; limit: number; search: string };
  setPage: (p: number) => void;
  setSearch: (s: string) => void;
}
export const useCoursesStore = create<CoursesStore>((set) => ({
  filters: { page: 1, limit: 10, search: "" },
  setPage: (p) => set((s) => ({ filters: { ...s.filters, page: p } })),
  setSearch: (search) =>
    set((s) => ({ filters: { ...s.filters, search, page: 1 } })),
}));
