import { createFileRoute } from '@tanstack/react-router'
import { ChatPanel } from '../../../../modules/classroom'

export const Route = createFileRoute(
  '/_protected/tsx/classroom/$classroomId/chat',
)({
  component: ChatPanel,
})

