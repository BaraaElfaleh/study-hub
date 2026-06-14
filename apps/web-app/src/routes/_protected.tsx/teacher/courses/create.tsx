// src/routes/_protected/tsx/teacher/courses/create.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../modules/auth/store/authStore';
import CreateCoursePage from '../../../../modules/courses/views/teacher/CreateCoursePage';

export const Route = createFileRoute('/_protected/tsx/teacher/courses/create')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) {
      throw redirect({ to: '/' });
    }
  },
  component: CreateCoursePage,
});