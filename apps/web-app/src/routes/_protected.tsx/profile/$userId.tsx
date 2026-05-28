import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '../../../modules/profile'

export const Route = createFileRoute('/_protected/tsx/profile/$userId')({
  component: ProfilePage
})

