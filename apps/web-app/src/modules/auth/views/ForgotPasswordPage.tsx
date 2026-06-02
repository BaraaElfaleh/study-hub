// src/modules/auth/views/ForgotPasswordPage.tsx
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Mail, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    setIsSubmitting(true);
    // محاكاة إرسال البريد
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4 py-12" dir="rtl">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* شعار النون */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:text-amber-400 transition-colors duration-300">
              النون
            </h1>
          </Link>
          <p className="text-white/60 mt-2 text-sm">استعادة كلمة المرور</p>
        </div>

        {/* البطاقة الزجاجية */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30">
          {!isSent ? (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                نسيت كلمة المرور؟
              </h2>
              <p className="text-white/60 text-sm text-center mb-6">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* حقل البريد الإلكتروني */}
                <div>
                  <label className="block text-white/80 text-sm mb-2 text-right">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@alnoon.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* رسالة خطأ */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-right">
                    {error}
                  </div>
                )}

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-[#050530]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      إرسال رابط الاستعادة
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* رسالة النجاح */
            <div className="text-center py-8">
              <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">تم الإرسال!</h2>
              <p className="text-white/60 text-sm">
                إذا كان البريد الإلكتروني مسجلاً لدينا، فستصلك رسالة تحتوي على رابط
                إعادة تعيين كلمة المرور.
              </p>
              <button
                onClick={() => {
                  setEmail('');
                  setIsSent(false);
                }}
                className="mt-6 text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>

        {/* العودة لتسجيل الدخول */}
        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors duration-300 text-sm">
            <ArrowLeft size={16} />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;