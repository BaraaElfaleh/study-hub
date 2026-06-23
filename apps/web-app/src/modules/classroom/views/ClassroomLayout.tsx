import { Outlet, Link, useParams } from '@tanstack/react-router';
import { BookOpen, CheckSquare, Bell, MessageCircle, HelpCircle, LayoutDashboard } from 'lucide-react';
import React from 'react';

interface ClassroomLayoutProps {
  children?: React.ReactNode;
}

const sidebarItems = [
  { key: 'overview', label: 'نظرة عامة', icon: LayoutDashboard, to: '/_protected/classroom/$classroomId/' },
  { key: 'lectures', label: 'المحاضرات', icon: BookOpen, to: '/_protected/classroom/$classroomId/lectures/' },
  { key: 'assignments', label: 'الواجبات', icon: CheckSquare, to: '/_protected/classroom/$classroomId/assignments/' },
  { key: 'announcements', label: 'الإعلانات', icon: Bell, to: '/_protected/classroom/$classroomId/announcements/' },
  { key: 'chat', label: 'الدردشة', icon: MessageCircle, to: '/_protected/classroom/$classroomId/chat/' },
  { key: 'quizzes', label: 'الاختبارات', icon: HelpCircle, to: '/_protected/classroom/$classroomId/quizzes/' },
];

export default function ClassroomLayout({ children }: ClassroomLayoutProps) {
  const { classroomId } = useParams({ strict: false }) as { classroomId?: string };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200" dir="rtl">
      <aside className="w-64 border-l border-white/10 bg-[#040646]/50 backdrop-blur-xl p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500"><BookOpen size={18} /></div>
          <span className="font-bold text-white">القاعة الدراسية</span>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map(item => (
            <Link 
              key={item.key} 
              to={item.to} 
              params={{ classroomId: classroomId! }} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white" 
              activeProps={{ className: 'bg-gradient-to-r from-amber-500/20 to-transparent text-amber-400 border-r-2 border-amber-500' }}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gradient-to-br from-[#050530] via-[#020617] to-[#040646] p-4 lg:p-8">
        {children || <Outlet />}
      </main>
    </div>
  );
}