// src/modules/classroom/store/classroomStore.ts
import { create } from 'zustand';

export type ActiveFeature = 'lectures' | 'assignments' | 'announcements' | 'chat' | 'quizzes';

interface ClassroomState {
  activeFeature: ActiveFeature;
  currentLectureId: string | null;
  setActiveFeature: (feature: ActiveFeature) => void;
  setCurrentLectureId: (id: string | null) => void;
}

export const useClassroomStore = create<ClassroomState>((set) => ({
  activeFeature: 'lectures',
  currentLectureId: null,
  setActiveFeature: (feature) => set({ activeFeature: feature }),
  setCurrentLectureId: (id) => set({ currentLectureId: id }),
}));