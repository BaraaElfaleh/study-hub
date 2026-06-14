// src/routes/_protected/tsx/classroom/_layout/$classroomId/announcements/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import AnnouncementListPage from '../../../../../../modules/classroom/announcements/views/AnnouncementListPage';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/announcements/')({
  component: AnnouncementListPage,
});