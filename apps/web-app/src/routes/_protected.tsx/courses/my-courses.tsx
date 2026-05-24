import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tsx/courses/my-courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tsx/courses/my-courses"!</div>
}
