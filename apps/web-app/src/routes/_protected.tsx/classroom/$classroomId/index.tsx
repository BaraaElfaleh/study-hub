// src/routes/_protected/tsx/classroom/$classroomId/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ClassroomOverview from '../../../../modules/classroom/views/ClassroomOverview'

export const Route = createFileRoute('/_protected/tsx/classroom/$classroomId/')({
  component: ClassroomOverview,
})