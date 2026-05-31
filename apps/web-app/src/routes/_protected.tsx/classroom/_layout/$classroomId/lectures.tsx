import { createFileRoute } from '@tanstack/react-router'
import { LectureView } from '../../../../../modules/classroom'

export const Route = createFileRoute(
  '/_protected/tsx/classroom/_layout/$classroomId/lectures',
)({
  component: LectureView,
})

