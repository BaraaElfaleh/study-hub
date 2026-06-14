// src/routes/_protected/tsx/classroom/_layout/$classroomId/quizzes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import QuizListPage from '../../../../../../modules/classroom/quizzes/views/QuizListPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/quizzes/')({
  component: QuizListPage,
});