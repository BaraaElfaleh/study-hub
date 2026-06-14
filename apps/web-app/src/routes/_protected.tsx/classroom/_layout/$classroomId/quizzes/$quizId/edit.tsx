// src/routes/_protected/tsx/classroom/_layout/$classroomId/quizzes/$quizId/edit.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../../../modules/auth/store/authStore';
import QuizEditorPage from '../../../../../../../modules/classroom/quizzes/views/QuizEditorPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/quizzes/$quizId/edit')({
  beforeLoad: ({ params }) => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) {
      throw redirect({
        to: '/tsx/classroom/$classroomId/quizzes',
        params: { classroomId: params.classroomId },
      });
    }
  },
  component: QuizEditorPage,
});