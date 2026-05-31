// src/routes/_protected/tsx/classroom/$classroomId/manage.tsx
import { createFileRoute } from '@tanstack/react-router'
import ManageClassroomPage from '../../../../../modules/classroom/views/ManageClassroomPage'

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/manage')({
  component: ManageClassroomPage,
})