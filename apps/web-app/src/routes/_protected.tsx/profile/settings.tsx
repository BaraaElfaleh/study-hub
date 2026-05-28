import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../../modules/auth/store/authStore'
import { SettingsPage } from '../../../modules/profile'

export const Route = createFileRoute('/_protected/tsx/profile/settings')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) throw redirect({ to: '/login' })
  },
  component: SettingsPage,
})