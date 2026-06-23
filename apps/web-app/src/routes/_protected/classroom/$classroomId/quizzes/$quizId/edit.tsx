import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../../../../../modules/auth/store/authStore';
import QuizEditorPage from '../../../../../../modules/classroom/quizzes/views/QuizEditorPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/quizzes/$quizId/edit')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) throw redirect({ to: '/' });
  },
  component: QuizEditorPage,
});