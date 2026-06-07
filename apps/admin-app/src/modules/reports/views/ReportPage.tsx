// apps/admin-app/src/modules/reports/views/ReportPage.tsx
import { useReports } from '../hooks/useReports';
import { Table, Loader } from '../../../shared/components/ui';
import { formatDate } from '../../../shared/utils';
import { TrendingUp, BookOpen, Users } from 'lucide-react';

const ReportPage = () => {
  const { chartData, topCourses, activeUsers, isLoading, error } = useReports();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل التقارير</p>;

  const courseColumns = [
    { key: 'title', header: 'الكورس' },
    { key: 'enrollments', header: 'عدد المسجلين' },
  ];

  const userColumns = [
    { key: 'name', header: 'الاسم' },
    {
      key: 'role',
      header: 'الدور',
      render: (u: any) => (
        <span className={u.role === 'teacher' ? 'text-blue-400' : 'text-amber-400'}>
          {u.role === 'teacher' ? 'معلم' : 'طالب'}
        </span>
      ),
    },
    {
      key: 'lastActive',
      header: 'آخر نشاط',
      render: (u: any) => formatDate(u.lastActive),
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">التقارير</h1>

      {/* رسم بياني للإيرادات */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-amber-400" />
          الإيرادات الشهرية
        </h2>
        <div className="flex items-end gap-2 h-48">
          {chartData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 font-mono">
                {(item.amount / 1000).toFixed(0)}k
              </span>
              <div
                className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md transition-all hover:from-amber-400 hover:to-amber-300"
                style={{ height: `${(item.amount / 20000) * 100}%` }}
              />
              <span className="text-xs text-slate-500 mt-1">
                {item.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* جدولان جنبًا إلى جنب */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <BookOpen size={20} className="text-amber-400" />
            الكورسات الأعلى تسجيلاً
          </h2>
          <Table columns={courseColumns} data={topCourses} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-amber-400" />
            المستخدمين الأكثر نشاطاً
          </h2>
          <Table columns={userColumns} data={activeUsers} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;