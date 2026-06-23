import { createFileRoute } from '@tanstack/react-router';
import NotificationListPage from '../../../modules/notifications/views/NotificationListPage';
export const Route = createFileRoute('/_protected/notifications/')({ component: NotificationListPage });