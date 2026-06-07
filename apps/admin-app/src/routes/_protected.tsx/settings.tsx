// apps/admin-app/src/routes/settings.tsx
import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '../../modules/settings';

export const Route = createFileRoute('/_protected/tsx/settings')({
  component: SettingsPage,
});