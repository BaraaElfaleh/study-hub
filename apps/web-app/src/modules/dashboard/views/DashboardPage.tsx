import { useAuthStore } from '../../auth/store/authStore';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import { Link } from '@tanstack/react-router';

const DashboardPage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <p className="text-white text-xl">يجب تسجيل الدخول</p>
        <Link to="/login" className="text-amber-400 mr-4">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038]" dir="rtl">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        {user.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      </div>
    </div>
  );
};

export default DashboardPage;