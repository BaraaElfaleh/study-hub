import { Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, Users, BookOpen, TicketPercent, CreditCard, UserPlus, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../../modules/auth/hooks/useAuth';

const items = [
  { label: 'لوحة التحكم', icon: LayoutDashboard, to: '/_admin/dashboard' },
  { label: 'المستخدمين', icon: Users, to: '/_admin/users' },
  { label: 'الكورسات', icon: BookOpen, to: '/_admin/courses' },
  { label: 'الكوبونات', icon: TicketPercent, to: '/_admin/coupons' },
  { label: 'المدفوعات', icon: CreditCard, to: '/_admin/payments' },
  { label: 'التسجيلات', icon: UserPlus, to: '/_admin/enrollments' },
  { label: 'التحليلات', icon: BarChart3, to: '/_admin/analytics' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const loc = useLocation(); const { logout } = useAuth();
  return <div className="flex min-h-screen bg-[#020617] text-slate-200" dir="rtl">
    <aside className="w-64 border-l border-white/10 bg-[#040646]/50 backdrop-blur-xl p-6 flex flex-col">
      <Link to="/_admin/dashboard" className="flex items-center gap-2 mb-10"><div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500"><LayoutDashboard size={18}/></div><span className="font-bold text-white">لوحة الإدارة</span></Link>
      <nav className="flex flex-col gap-1 flex-1">{items.map(i=>{ const active=loc.pathname===i.to; return <Link key={i.to} to={i.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${active?'bg-amber-400/10 text-amber-400 border-r-2 border-amber-400':'text-slate-400 hover:bg-white/5 hover:text-white'}`}><i.icon size={20}/>{i.label}</Link>;})}</nav>
      <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-3 rounded-xl text-sm"><LogOut size={18}/> تسجيل الخروج</button>
    </aside>
    <main className="flex-1 bg-gradient-to-br from-[#050530] via-[#020617] to-[#040646] p-6 lg:p-10 overflow-y-auto">{children}</main>
  </div>;
}