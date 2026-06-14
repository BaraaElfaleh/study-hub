// src/routes/_protected/tsx/my-courses/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../modules/auth/store/authStore';
import MyCoursesPage from '../../../../modules/courses/views/student/MyCoursesPage';

export const Route = createFileRoute('/_protected/tsx/teacher/courses/')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || user.role !== 'STUDENT') {
      throw redirect({ to: '/tsx/courses' }); // أو صفحة غير مصرح
    }
  },
  component: MyCoursesPage,
});