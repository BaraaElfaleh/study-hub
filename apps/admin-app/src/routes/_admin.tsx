import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminLayout from '../shared/components/layout/AdminLayout';
import { useAuthStore } from '../modules/auth/store/authStore';

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('adminAccessToken');
    const user = useAuthStore.getState().user;
    if (!token || !user || user.role !== 'ADMIN') {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});