// apps/admin-app/src/routes/__root.tsx
import { useState } from 'react';
import { createRootRoute, Outlet, Link, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Headphones,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../modules/auth/store/authStore';

const sidebarLinks = [
  { to: '/tsx/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/tsx/users', label: 'المستخدمين', icon: Users },
  { to: '/tsx/courses', label: 'الكورسات', icon: BookOpen },
  { to: '/tsx/payments', label: 'المدفوعات', icon: DollarSign },
  { to: '/tsx/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/tsx/notifications', label: 'الإشعارات', icon: Bell },
  { to: '/tsx/support', label: 'الدعم الفني', icon: Headphones },
  { to: '/tsx/settings', label: 'الإعدادات', icon: Settings },
];

const RootLayout = () => {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearSession = useAuthStore((s) => s.clearSession);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex" dir="rtl">
      {/* زر فتح الشريط على الجوال */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* طبقة الخلفية للشريط الجانبي على الجوال */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* الشريط الجانبي */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-slate-900 border-l border-slate-800 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/tsx/dashboard" className="text-2xl font-bold text-amber-400">
            النون
          </Link>
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-slate-500 text-xs px-6">لوحة التحكم</p>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              {user?.name?.charAt(0) || 'م'}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name || 'مشرف'}</p>
              <p className="text-slate-500 text-xs">مدير النظام</p>
            </div>
          </div>
          <button
            onClick={() => {
              clearSession();
              window.location.href = '/';
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm transition-colors w-full"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createRootRoute({
  beforeLoad: () => ({
    auth: {
      isAuthenticated: useAuthStore.getState().isAuthenticated,
      user: useAuthStore.getState().user,
    },
  }),
  component: RootLayout,
});