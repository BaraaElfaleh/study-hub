// src/routes/_protected/tsx/classroom/_layout/$classroomId/enrollments/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../../modules/auth/store/authStore';
import EnrollmentManagementPage from '../../../../../../modules/classroom/enrollments/views/EnrollmentManagementPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/enrollments/')({
  beforeLoad: ({ params }) => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) {
      throw redirect({
        to: '/tsx/classroom/$classroomId',
        params: { classroomId: params.classroomId },
      });
    }
  },
  component: EnrollmentManagementPage,
});