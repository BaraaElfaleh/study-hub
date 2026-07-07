import { createFileRoute } from '@tanstack/react-router';
import DashboardPage from '../../modules/dashboard/pages/DashboardPage';
export const Route = createFileRoute('/_admin/dashboard')({ component: DashboardPage });