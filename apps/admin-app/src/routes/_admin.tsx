import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminLayout from '../shared/components/layout/AdminLayout';
import { useAuthStore } from '../modules/auth/store/authStore';

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('adminAccessToken');
    const user = useAuthStore.getState().user;
    console.log('🔍 beforeLoad _admin | token:', token, 'user:', user);
    if (!token || !user || user.role?.toUpperCase() !== 'ADMIN') {
      console.warn('⛔ ممنوع الدخول – يتم التوجيه إلى /login');
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
    console.log('✅ مسموح بالدخول');
  },
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});