import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tsx/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tsx/notifications"!</div>
}
