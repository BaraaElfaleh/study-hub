// src/routes/_protected/tsx/classroom/_layout/$classroomId/assignments/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import AssignmentListPage from '../../../../../../modules/classroom/assignments/views/AssignmentListPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/assignments/')({
  component: AssignmentListPage,
});