// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../shared/components/ui/Navbar'; // مثال

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