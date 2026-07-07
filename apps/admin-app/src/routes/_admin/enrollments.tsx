import { createFileRoute } from '@tanstack/react-router';
import EnrollmentsPage from '../../modules/enrollments/pages/EnrollmentsPage';
export const Route = createFileRoute('/_admin/enrollments')({ component: EnrollmentsPage });