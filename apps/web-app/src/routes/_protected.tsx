import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw redirect({ to: '/login', search: { redirect: location.href } });
  },
  component: () => <Outlet />,
});