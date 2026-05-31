// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../shared/components/ui/Navbar';
import { useAuthStore } from '../modules/auth/store/authStore';

export const Route = createRootRoute({
  // إعداد context الذي سيكون متاحًا لجميع المسارات الفرعية
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
});