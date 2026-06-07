import { useDashboard } from '../hooks/useDashboard';
import { StatCard, Table, Loader } from '../../../shared/components/ui';
import { formatDate, formatCurrency } from '../../../shared/utils';
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const DashboardPage = () => {
  const { stats, chartData, latestUsers, latestPayments, isLoading, error } = useDashboard();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل البيانات</p>;

  const userColumns = [
    { key: 'name', header: 'الاسم' },
    {
      key: 'role',
      header: 'الدور',
      render: (user: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'teacher' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
          {user.role === 'teacher' ? 'معلم' : 'طالب'}
        </span>
      ),
    },
    {
      key: 'joinedAt',
      header: 'تاريخ التسجيل',
      render: (user: any) => formatDate(user.joinedAt),
    },
  ];

  const paymentColumns = [
    { key: 'userName', header: 'الطالب' },
    { key: 'courseName', header: 'الكورس' },
    {
      key: 'amount',
      header: 'المبلغ',
      render: (pay: any) => formatCurrency(pay.amount),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (pay: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          pay.status === 'completed' ? 'bg-green-500/10 text-green-400' :
          pay.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {pay.status === 'completed' ? 'مكتمل' : pay.status === 'pending' ? 'معلق' : 'فشل'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
        <Link to="/tsx/dashboard" className="text-slate-400 hover:text-amber-400 text-sm flex items-center gap-1">
          <ArrowLeft size={16} />
          العودة للرئيسية
        </Link>
      </div>

      {/* بطاقات إحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي المستخدمين"
          value={stats?.totalUsers.toLocaleString() ?? 0}
          icon={<Users size={24} />}
          change="+12% الشهر الماضي"
        />
        <StatCard
          title="الكورسات النشطة"
          value={stats?.totalCourses ?? 0}
          icon={<BookOpen size={24} />}
          change="+2 كورس جديد"
        />
        <StatCard
          title="الإيرادات الشهرية"
          value={formatCurrency(stats?.totalRevenue ?? 0)}
          icon={<DollarSign size={24} />}
          change="+18% عن الشهر الماضي"
        />
        <StatCard
          title="الطلاب المسجلين"
          value={stats?.activeEnrollments?.toLocaleString() ?? 0}
          icon={<GraduationCap size={24} />}
          change="+5% عن الأسبوع الماضي"
        />
      </div>

      {/* رسم بياني للإيرادات (مُستبدل) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-amber-400" />
          الإيرادات الشهرية (آخر 12 شهرًا)
        </h2>
        <div className="flex items-end gap-2 h-48">
          {chartData?.map((item, i) => (
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

      {/* جداول مختصرة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-3">آخر المستخدمين المسجلين</h2>
          <Table columns={userColumns} data={latestUsers ?? []} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-3">آخر المدفوعات</h2>
          <Table columns={paymentColumns} data={latestPayments ?? []} />
        </div>
      </div>

      {/* روابط سريعة */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">روابط سريعة</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/tsx/users" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            إدارة المستخدمين
          </Link>
          <Link to="/tsx/courses" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            إدارة الكورسات
          </Link>
          <Link to="/tsx/payments" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            المدفوعات
          </Link>
          <Link to="/tsx/reports" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            التقارير
          </Link>
          <Link to="/tsx/settings" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            الإعدادات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;