// apps/admin-app/src/routes/support.tsx
import { createFileRoute } from '@tanstack/react-router';
import { SupportPage } from '../../modules/support';

export const Route = createFileRoute('/_protected/tsx/support')({
  component: SupportPage,
});