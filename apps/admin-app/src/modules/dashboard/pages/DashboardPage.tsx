import { useDashboard } from '../hooks/useDashboard';
import StatCard from '../../../shared/components/ui/StatCard';
import Loader from '../../../shared/components/ui/Loader';
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-400 text-center py-10">فشل تحميل البيانات</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">لوحة التحكم</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users size={24} />} label="إجمالي المستخدمين" value={data?.totalUsers ?? '-'} />
        <StatCard icon={<BookOpen size={24} />} label="إجمالي الكورسات" value={data?.totalCourses ?? '-'} />
        <StatCard icon={<GraduationCap size={24} />} label="التسجيلات" value={data?.totalEnrollments ?? '-'} />
        <StatCard icon={<DollarSign size={24} />} label="الإيرادات" value={`$${data?.totalRevenue ?? 0}`} />
      </div>
    </div>
  );
}