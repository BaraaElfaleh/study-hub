// src/modules/profile/views/ProfilePage.tsx
import { Link } from '@tanstack/react-router';
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const stats = {
  enrolledCourses: 3,
  completedCourses: 1,
  overallProgress: 62,
};

const ProfilePage = () => {
  const { profile } = useProfile();

  if (!profile) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <p className="text-white text-xl">يجب تسجيل الدخول لعرض الملف الشخصي</p>
        <Link to="/login" className="text-amber-400 mr-4">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038]" dir="rtl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            الملف الشخصي
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover border-2 border-amber-400/50 shadow-lg" />
                ) : (
                  <div className="w-full h-full rounded-full bg-linear-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/30 flex items-center justify-center">
                    <User size={48} className="text-amber-400" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
              <p className="text-amber-400 text-sm font-medium mb-4 capitalize">
                {profile.role === 'student' ? 'طالب' : 'معلم'}
              </p>
              <div className="space-y-3 text-right">
                <div className="flex items-center gap-3 text-white/70 text-sm bg-white/5 rounded-xl p-3">
                  <Mail size={16} className="text-amber-400 shrink-0" />
                  <span dir="ltr">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm bg-white/5 rounded-xl p-3">
                  <Calendar size={16} className="text-amber-400 shrink-0" />
                  <span>انضم منذ {new Date(profile.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
              <Link
                to="/tsx/profile/settings"
                className="inline-flex items-center gap-2 mt-6 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300"
              >
                <Settings size={16} />
                تعديل الملف
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
                <BookOpen size={32} className="text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stats.enrolledCourses}</div>
                <div className="text-white/60 text-sm mt-1">كورسات مسجل بها</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
                <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stats.completedCourses}</div>
                <div className="text-white/60 text-sm mt-1">مكتملة</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
                <TrendingUp size={32} className="text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stats.overallProgress}%</div>
                <div className="text-white/60 text-sm mt-1">التقدم العام</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-amber-400" />
                كورساتي النشطة
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'تطوير واجهات الويب بـ React', progress: 65 },
                  { name: 'تطوير تطبيقات الموبايل بـ Flutter', progress: 20 },
                ].map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{course.name}</h4>
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 max-w-xs">
                        <div className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                    <span className="text-amber-400 text-sm font-bold">{course.progress}%</span>
                  </div>
                ))}
              </div>
              <Link to="/tsx/classroom/my-courses" className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm mt-4 transition-colors">
                عرض كل الكورسات
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors duration-300 text-sm">
            <ArrowLeft size={16} />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;