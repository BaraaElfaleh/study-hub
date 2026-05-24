// src/routes/_protected/_protected.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/tsx/_protected')({
  // 🟢 أثناء التطوير: لا نفحص المصادقة
  // beforeLoad: () => { ... },
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});