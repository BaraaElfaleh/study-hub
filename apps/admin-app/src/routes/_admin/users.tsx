import { createFileRoute } from '@tanstack/react-router';
import UsersListPage from '../../modules/users/pages/UsersListPage';
export const Route = createFileRoute('/_admin/users')({ component: UsersListPage });