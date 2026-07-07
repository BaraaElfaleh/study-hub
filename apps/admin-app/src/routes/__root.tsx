import { createRootRoute, Outlet } from '@tanstack/react-router';

const NotFound = () => (
  <div className="min-h-screen bg-[#050530] flex items-center justify-center text-white text-center">
    <div>
      <p className="text-4xl font-bold mb-4">404</p>
      <p className="text-lg">الصفحة غير موجودة</p>
    </div>
  </div>
);

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFound />,
});