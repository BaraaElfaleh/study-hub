import { useAnalytics } from '../hooks/useAnalytics';
import { useAnalyticsStore } from '../store/analyticsStore';
import StatCard from '../../../shared/components/ui/StatCard';
import Loader from '../../../shared/components/ui/Loader';
import { Users, BookOpen, GraduationCap, DollarSign, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();
  const { startDate, endDate } = useAnalyticsStore();
  const setStart = (v: string) => useAnalyticsStore.setState({ startDate: v });
  const setEnd = (v: string) => useAnalyticsStore.setState({ endDate: v });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-400 text-center py-10">فشل تحميل البيانات</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">التحليلات</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-amber-400" />
          <input type="date" value={startDate} onChange={(e) => setStart(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-amber-400" />
          <input type="date" value={endDate} onChange={(e) => setEnd(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Users size={24} />} label="المستخدمين" value={data?.totalUsers ?? '-'} />
        <StatCard icon={<BookOpen size={24} />} label="الكورسات" value={data?.totalCourses ?? '-'} />
        <StatCard icon={<GraduationCap size={24} />} label="التسجيلات" value={data?.totalEnrollments ?? '-'} />
        <StatCard icon={<DollarSign size={24} />} label="الإيرادات" value={`$${data?.totalRevenue ?? 0}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">المستخدمين حسب الدور</h3>
          {data?.usersByRole?.map((r) => (
            <div key={r.role} className="flex justify-between py-2 border-b border-white/5 text-white">
              <span>{r.role === 'STUDENT' ? 'طالب' : r.role === 'TEACHER' ? 'معلم' : 'مشرف'}</span>
              <span>{r.count}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">التسجيلات الشهرية</h3>
          {data?.enrollmentsByMonth?.map((m) => (
            <div key={m.month} className="flex items-center gap-2 text-sm text-white mb-1">
              <span className="w-16">{m.month}</span>
              <div className="flex-1 bg-white/10 rounded-full h-4">
                <div className="bg-amber-400 h-4 rounded-full" style={{ width: `${(m.count / Math.max(...data.enrollmentsByMonth.map(x => x.count), 1)) * 100}%` }} />
              </div>
              <span>{m.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}