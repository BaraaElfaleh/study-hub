import { createFileRoute } from '@tanstack/react-router';
import CouponsListPage from '../../modules/coupons/pages/CouponsListPage';
export const Route = createFileRoute('/_admin/coupons')({ component: CouponsListPage });