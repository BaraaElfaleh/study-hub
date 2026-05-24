import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tsx/classroom/$classroomId/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_protected/tsx/classroom/$classroomId/"!</div>
}
