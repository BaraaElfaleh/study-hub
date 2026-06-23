import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../modules/auth/store/authStore';
import EditCoursePage from '../../../../../modules/courses/views/teacher/EditCoursePage';
export const Route = createFileRoute('/_protected/teacher/courses/$courseId/edit')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) throw redirect({ to: '/' });
  },
  component: EditCoursePage,
});