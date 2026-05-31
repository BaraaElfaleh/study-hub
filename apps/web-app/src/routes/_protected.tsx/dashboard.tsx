import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '../../modules/dashboard'

export const Route = createFileRoute('/_protected/tsx/dashboard')({
 
  component: DashboardPage,
})