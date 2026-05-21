
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { Navbar } from '../components/Navbar';

export const Route = createRootRoute({


// في __root.tsx
component: () => (
  <div className="min-h-screen">
    {/* <Navbar /> */}
    <main>
      <Outlet />
    </main>
  </div>
),}); 