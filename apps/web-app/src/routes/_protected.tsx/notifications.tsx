import { createFileRoute } from '@tanstack/react-router'
import { NotificationListPage } from '../../modules/notifications';

export const Route = createFileRoute('/_protected/tsx/notifications')({
  component: NotificationListPage,
})

