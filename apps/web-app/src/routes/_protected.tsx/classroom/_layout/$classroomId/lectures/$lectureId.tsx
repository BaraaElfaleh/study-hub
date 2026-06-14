// src/routes/_protected/tsx/classroom/_layout/$classroomId/lectures/$lectureId.tsx
import { createFileRoute } from '@tanstack/react-router';
import LectureDetailPage from '../../../../../../modules/classroom/lectures/views/LectureDetailPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/lectures/$lectureId')({
  component: LectureDetailPage,
});