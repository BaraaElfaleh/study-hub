// src/modules/profile/views/ProfilePage.tsx
import { Link } from '@tanstack/react-router';
import {
  User,
  Mail,
  Calendar,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
  const { profile } = useProfile();

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <p className="text-white text-xl">يجب تسجيل الدخول لعرض الملف الشخصي</p>
        <Link to="/login" className="text-amber-400 mr-4">تسجيل الدخول</Link>
      </div>
    );
  }

  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4 py-12" dir="rtl">
      {/* تأثيرات الخلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            الملف الشخصي
          </h1>
        </div>

        {/* بطاقة المعلومات الأساسية */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 mb-6">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-amber-400/50 shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/30 flex items-center justify-center">
                  <User size={48} className="text-amber-400" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              {fullName || 'مستخدم'}
            </h2>
            <p className="text-amber-400 text-sm font-medium mb-6 capitalize">
              {profile.role === 'STUDENT' ? 'طالب' : profile.role === 'TEACHER' ? 'معلم' : 'مشرف'}
            </p>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-3 text-white/70 text-sm bg-white/5 rounded-xl p-4">
                <Mail size={18} className="text-amber-400 shrink-0" />
                <span dir="ltr">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm bg-white/5 rounded-xl p-4">
                <Calendar size={18} className="text-amber-400 shrink-0" />
                <span>انضم منذ {new Date(profile.createdAt || Date.now()).toLocaleDateString('ar-SA')}</span>
              </div>
            </div>

            <Link
              to="/profile/settings"
              className="inline-flex items-center justify-center gap-2 mt-8 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
            >
              <Settings size={18} />
              تعديل الملف الشخصي
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors duration-300 text-sm"
          >
            <ArrowLeft size={16} />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;