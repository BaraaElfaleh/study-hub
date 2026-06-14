// src/routes/_protected/tsx/teacher/courses/$courseId/edit.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../modules/auth/store/authStore';
import EditCoursePage from '../../../../../modules/courses/views/teacher/EditCoursePage';

export const Route = createFileRoute('/_protected/tsx/teacher/courses/$courseId/edit')({
  beforeLoad: ({ params }) => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) {
      throw redirect({ to: '/' });
    }
    // يمكن إضافة تحقق أن الكورس يخص المعلم نفسه لاحقاً
  },
  component: EditCoursePage,
});