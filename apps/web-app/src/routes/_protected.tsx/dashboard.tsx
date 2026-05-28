import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardPage } from '../../modules/dashboard'
import { useAuthStore } from '../../modules/auth/store/authStore'

export const Route = createFileRoute('/_protected/tsx/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) throw redirect({ to: '/login' })
  },
  component: DashboardPage,
})