// src/routes/courses/my-courses.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import MyCoursesPage from '../../../modules/courses/views/my-courses'
import { useAuthStore } from '../../../modules/auth/store/authStore'

export const Route = createFileRoute('/_protected/tsx/classroom/my-courses')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: MyCoursesPage,
})