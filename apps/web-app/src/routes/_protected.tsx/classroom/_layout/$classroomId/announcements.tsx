import { createFileRoute } from '@tanstack/react-router'
import { AnnouncementList } from '../../../../../modules/classroom'

// تأكد أن المسار يبدأ بنفس مسار الـ Layout الذي أنشأناه
export const Route = createFileRoute(
  '/_protected/tsx/classroom/_layout/$classroomId/announcements',
)({
  component: AnnouncementList,
})