// src/routes/__root.tsx
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
} from 'lucide-react';

import { useAuthStore } from '../modules/auth/store/authStore';
// import NotFoundPage from '../pages/NotFoundPage';

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

  // حالة غير مسجل الدخول: عرض شريط علوي عادي والمحتوى فقط
  if (!isAuthenticated) {
    
   return (
      <div className="min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    );

  }

  // حالة مسجل الدخول (مدير): عرض الشريط الجانبي الكامل

       return (
    <div className="min-h-screen bg-slate-950 flex" dir="rtl">
      <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link to="/tsx/dashboard" className="text-2xl font-bold text-amber-400">
            النون
          </Link>
          <p className="text-slate-500 text-xs mt-1">لوحة التحكم</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
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

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createRootRoute({
  beforeLoad: () => {
    return {
      auth: {
        isAuthenticated: useAuthStore.getState().isAuthenticated,
        user: useAuthStore.getState().user,
      },
    };
  },
  component: RootLayout,
  // notFoundComponent: () => <NotFoundPage />,
});