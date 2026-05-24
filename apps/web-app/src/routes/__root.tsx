// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '..//modules/shared/components/ui/Navbar'; // مثال

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  ),
});