// src/routes/classroom/$classroomId/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ClassroomOverview from '../../../modules/classroom/views/ClassroomOverview'

export const Route = createFileRoute('/_protected/tsx/classroom/_layout')({
  component: ClassroomOverview,
})