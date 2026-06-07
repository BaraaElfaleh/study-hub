// src/components/layouts/ClassroomLayout.tsx
import { useState } from 'react';
import { Outlet, Link, useParams } from '@tanstack/react-router';
import {
  BookOpen,
  CheckSquare,
  Bell,
  MessageCircle,
  LayoutDashboard,
  ChevronLeft,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';

export const ClassroomLayout = () => {
  const { classroomId } = useParams({ strict: false }) as { classroomId?: string };
  const user = useAuthStore((s) => s.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { key: 'overview', label: 'نظرة عامة', icon: LayoutDashboard, to: '/tsx/classroom/$classroomId' },
    { key: 'lectures', label: 'المحاضرات', icon: BookOpen, to: '/tsx/classroom/$classroomId/lectures' },
    { key: 'tasks', label: 'المهام', icon: CheckSquare, to: '/tsx/classroom/$classroomId/tasks' },
    { key: 'announcements', label: 'الإعلانات', icon: Bell, to: '/tsx/classroom/$classroomId/announcements' },
    { key: 'chat', label: 'الدردشة', icon: MessageCircle, to: '/tsx/classroom/$classroomId/chat' },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200" dir="rtl">
      {/* زر فتح الشريط على الجوال */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* طبقة الخلفية */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* الشريط الجانبي */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 border-l border-white/10 bg-[#040646]/50 backdrop-blur-xl p-6 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
              <BookOpen size={18} />
            </div>
            <span className="font-bold text-white tracking-wide">القاعة الدراسية</span>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ classroomId: classroomId! }}
              onClick={() => setSidebarOpen(false)}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:bg-white/5 hover:text-white"
              activeProps={{
                className:
                  'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-400 border-r-2 border-amber-500',
              }}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              {item.label}
              <ChevronLeft size={16} className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {user?.role === 'teacher' && (
            <Link
              to="/tsx/classroom/$classroomId/manage"
              params={{ classroomId: classroomId! }}
              onClick={() => setSidebarOpen(false)}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:bg-white/5 hover:text-white mt-4 border-t border-white/10 pt-4"
              activeProps={{
                className:
                  'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-400 border-r-2 border-amber-500',
              }}
            >
              <Settings size={20} className="group-hover:scale-110 transition-transform" />
              إدارة الفصل
              <ChevronLeft size={16} className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#050530] via-[#020617] to-[#040646]">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};