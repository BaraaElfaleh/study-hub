// src/modules/auth/pages/RegisterPage.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { register, registerError, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('كلمة المرور غير متطابقة');
      return;
    }
    register({ firstName, lastName, email, password });
  };

  const errorMessage =
    (registerError as any)?.response?.data?.message ||
    (registerError as any)?.message ||
    'حدث خطأ أثناء التسجيل';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4 py-12">
      {/* تأثيرات الخلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:text-amber-400 transition-colors duration-300">
              النون
            </h1>
          </Link>
          <p className="text-white/60 mt-2 text-sm">انضم إلى مجتمع النون التعليمي</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30">
          <h2 className="text-2xl font-bold text-white text-center mb-6">إنشاء حساب جديد</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">الاسم الأول</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="محمد"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">الاسم الأخير</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="أحمد"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@alnoon.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>

            {registerError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-right">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#050530]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري إنشاء الحساب...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  إنشاء حساب
                </>
              )}
            </button>
          </form>

          {/* فاصل "أو" */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#040646] text-white/50">أو</span>
            </div>
          </div>

          {/* زر التسجيل باستخدام Google */}
          <button
            type="button"
            onClick={() => (window.location.href = 'http://localhost:3001/auth/google')}
            className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            التسجيل باستخدام Google
          </button>

          <div className="mt-6 text-center">
            <span className="text-white/50 text-sm">لديك حساب؟ </span>
            <Link to="/login" className="text-amber-400 text-sm">
              تسجيل الدخول
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/50 text-sm">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;