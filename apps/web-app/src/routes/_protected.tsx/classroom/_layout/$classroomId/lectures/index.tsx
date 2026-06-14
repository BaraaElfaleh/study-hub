// src/routes/_protected/tsx/classroom/_layout/$classroomId/lectures/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import LectureListPage from '../../../../../../modules/classroom/lectures/views/LectureListPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/lectures/')({
  component: LectureListPage,
});