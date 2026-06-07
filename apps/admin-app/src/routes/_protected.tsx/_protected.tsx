// apps/admin-app/src/routes/_protected.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../modules/auth/store/authStore';

export const Route = createFileRoute('/_protected/tsx/_protected')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});