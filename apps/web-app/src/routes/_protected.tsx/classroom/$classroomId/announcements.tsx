import { createFileRoute } from '@tanstack/react-router'
import { AnnouncementList } from '../../../../modules/classroom'

export const Route = createFileRoute(
  '/_protected/tsx/classroom/$classroomId/announcements',
)({
  component: AnnouncementList,
})
