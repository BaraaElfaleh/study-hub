import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../modules/auth/store/authStore';
import TeacherCoursesPage from '../../../../modules/courses/views/teacher/TeacherCoursesPage';
export const Route = createFileRoute('/_protected/teacher/courses/')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) throw redirect({ to: '/' });
  },
  component: TeacherCoursesPage,
});