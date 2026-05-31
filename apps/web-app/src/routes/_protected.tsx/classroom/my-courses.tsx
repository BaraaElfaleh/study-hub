// src/routes/courses/my-courses.tsx
import { createFileRoute } from '@tanstack/react-router'
import MyCoursesPage from '../../../modules/courses/views/my-courses'

export const Route = createFileRoute('/_protected/tsx/classroom/my-courses')({
 
  component: MyCoursesPage,
})