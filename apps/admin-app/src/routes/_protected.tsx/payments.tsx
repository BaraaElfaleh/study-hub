// apps/admin-app/src/routes/payments.tsx
import { createFileRoute } from '@tanstack/react-router';
import { PaymentListPage } from '../../modules/payments';

export const Route = createFileRoute('/_protected/tsx/payments')({
  component: PaymentListPage,
});