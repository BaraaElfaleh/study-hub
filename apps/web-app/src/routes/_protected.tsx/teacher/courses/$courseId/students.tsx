// src/routes/_protected/tsx/teacher/courses/$courseId/students.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../modules/auth/store/authStore';
import CourseStudentsPage from '../../../../../modules/courses/views/teacher/CourseStudentsPage';

export const Route = createFileRoute('/_protected/tsx/teacher/courses/$courseId/students')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) {
      throw redirect({ to: '/' });
    }
  },
  component: CourseStudentsPage,
});