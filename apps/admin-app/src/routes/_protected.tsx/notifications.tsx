// apps/admin-app/src/routes/notifications.tsx
import { createFileRoute } from '@tanstack/react-router';
import { NotificationPage } from '../../modules/notifications';

export const Route = createFileRoute('/_protected/tsx/notifications')({
  component: NotificationPage,
});