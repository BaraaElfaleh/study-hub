import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tsx/classroom/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tsx/classroom/_layout"!</div>
}
