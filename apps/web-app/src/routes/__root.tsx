// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../shared/components/ui/Navbar';
import { useAuthStore } from '../modules/auth/store/authStore';
import NotFoundPage from '../pages/NotFoundPage';

export const Route = createRootRoute({
  beforeLoad: () => {
    return {
      auth: {
        isAuthenticated: useAuthStore.getState().isAuthenticated,
        user: useAuthStore.getState().user,
      },
    };
  },

  component: () => (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  ),
  
  // ✅ تمت إضافة notFoundComponent
  notFoundComponent: () => <NotFoundPage />,
});