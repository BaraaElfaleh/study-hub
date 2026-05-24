import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tsx/profile/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tsx/profile/$userId"!</div>
}
