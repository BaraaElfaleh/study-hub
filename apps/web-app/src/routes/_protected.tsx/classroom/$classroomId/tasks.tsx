import { createFileRoute } from '@tanstack/react-router'
import { TaskBoard } from '../../../../modules/classroom'
export const Route = createFileRoute(
  '/_protected/tsx/classroom/$classroomId/tasks',
)({
  component: TaskBoard,
})

