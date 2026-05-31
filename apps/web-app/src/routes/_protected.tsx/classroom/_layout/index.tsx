import { createFileRoute, Outlet, Link, useParams } from '@tanstack/react-router';
import { BookOpen, CheckSquare, Bell, MessageCircle, LayoutDashboard, ChevronLeft } from 'lucide-react';

const ClassroomLayout = () => {
  const { classroomId } = useParams({ strict: false }) as { classroomId?: string };

  const sidebarItems = [
    { key: 'overview', label: 'نظرة عامة', icon: LayoutDashboard, to: '/_protected/classroom/_layout/$classroomId/' },
    { key: 'lectures', label: 'المحاضرات', icon: BookOpen, to: '/_protected/classroom/_layout/$classroomId/lectures' },
    { key: 'tasks', label: 'المهام', icon: CheckSquare, to: '/_protected/classroom/_layout/$classroomId/tasks' },
    { key: 'announcements', label: 'الإعلانات', icon: Bell, to: '/_protected/classroom/_layout/$classroomId/announcements' },
    { key: 'chat', label: 'الدردشة', icon: MessageCircle, to: '/_protected/classroom/_layout/$classroomId/chat' },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200" dir="rtl">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-l border-white/10 bg-[#040646]/50 backdrop-blur-xl p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                <BookOpen size={18} />
            </div>
            <span className="font-bold text-white tracking-wide">القاعة الدراسية</span>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ classroomId: classroomId! }}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:bg-white/5 hover:text-white"
              // هذا الكلاس يضاف تلقائياً عند مطابقة المسار
              activeProps={{ 
                  className: 'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-400 border-r-2 border-amber-500' 
              }}
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              {item.label}
              <ChevronLeft size={16} className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-linear-to-br from-[#050530] via-[#020617] to-[#040646]">
        <div className="p-8 max-w-7xl mx-auto">
          {/* هنا يظهر الكومبونانت بشكل تلقائي بناءً على الرابط */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/')({
  component: ClassroomLayout,
});