import { createFileRoute } from '@tanstack/react-router';
import { UserListPage } from '../../modules/users';

export const Route = createFileRoute('/_protected/tsx/users')({
  component: UserListPage,
});