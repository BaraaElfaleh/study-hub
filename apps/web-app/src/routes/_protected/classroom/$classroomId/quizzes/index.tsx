import { createFileRoute } from '@tanstack/react-router';
import QuizListPage from '../../../../../modules/classroom/quizzes/views/QuizListPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/quizzes/')({ component: QuizListPage });