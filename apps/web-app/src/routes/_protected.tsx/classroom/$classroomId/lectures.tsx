import { createFileRoute } from '@tanstack/react-router'
import { LectureView } from '../../../../modules/classroom'

export const Route = createFileRoute(
  '/_protected/tsx/classroom/$classroomId/lectures',
)({
  component: LectureView,
})

