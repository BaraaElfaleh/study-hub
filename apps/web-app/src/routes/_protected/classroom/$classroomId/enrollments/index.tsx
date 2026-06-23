import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../modules/auth/store/authStore';
import EnrollmentManagementPage from '../../../../../modules/classroom/enrollments/views/EnrollmentManagementPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/enrollments/')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) throw redirect({ to: '/' });
  },
  component: EnrollmentManagementPage,
});