import { createFileRoute } from '@tanstack/react-router';
import AssignmentListPage from '../../../../../modules/classroom/assignments/views/AssignmentListPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/assignments/')({ component: AssignmentListPage });