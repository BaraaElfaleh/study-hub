// apps/admin-app/src/routes/reports.tsx
import { createFileRoute } from '@tanstack/react-router';
import { ReportPage } from '../../modules/reports';

export const Route = createFileRoute('/_protected/tsx/reports')({
  component: ReportPage,
});