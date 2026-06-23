import { createFileRoute } from '@tanstack/react-router';
import AnnouncementListPage from '../../../../../modules/classroom/announcements/views/AnnouncementListPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/announcements/')({ component: AnnouncementListPage });