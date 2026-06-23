// src/shared/components/ui/NotFoundPage.tsx
import { Link } from '@tanstack/react-router';
import { Home, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4 relative overflow-hidden" dir="rtl">
      {/* تأثيرات خلفية (نقاط مضيئة) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* أيقونة كبيرة */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
          <Compass size={48} className="text-amber-400" />
        </div>

        {/* رسالة الخطأ */}
        <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">عفواً! الصفحة غير موجودة</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          يبدو أنك قد ضللت الطريق. الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>

        {/* أزرار الإجراء */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
          >
            <Home size={18} />
            العودة للرئيسية
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-white/80 hover:text-amber-400 font-medium px-6 py-3 rounded-xl border border-white/20 hover:border-amber-400/50 transition-all duration-300"
          >
            <Compass size={18} />
            تصفح الكورسات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;