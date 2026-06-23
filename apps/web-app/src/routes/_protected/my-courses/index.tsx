import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../modules/auth/store/authStore';
import MyCoursesPage from '../../../modules/courses/views/student/MyCoursesPage';
export const Route = createFileRoute('/_protected/my-courses/')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    // استبدل السطر الذي يحتوي على redirect بهذا:
if (!user || user.role !== 'STUDENT') throw redirect({ to: '/courses' });
  },
  component: MyCoursesPage,
});