// components/HeroSection.jsx
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050530]">
      {/* خلفية متحركة - نقاط مضيئة */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-500" />
      </div>

      {/* تأثير توهج في الخلفية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/10 to-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-20 text-center">
        {/* شارة صغيرة */}
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2 mb-8">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-amber-400 text-sm font-medium">
            منذ 2023 — غزة، فلسطين
          </span>
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          تأتي{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            طالباً
          </span>
          .<br />
          تخرج{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
            تكسب
          </span>
          .
        </h1>

        {/* الوصف */}
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          الكهرباء تنطفئ. الجامعة تتعطّل. السوق هشّ. النون مكان واحد فيه كل ما
          تحتاجه عشان تتحوّل من عاطل إلى منتِج — مساحة، مهارة، مجتمع، وأول عميل.
        </p>

        {/* أزرار الإجراء */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://anoonsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-xl hover:shadow-amber-400/40 hover:-translate-y-1"
          >
            جرّب مساحتنا 3 ساعات مجاناً
            </a>
            <ArrowLeft
              size={20}
              className="inline-block mr-2 group-hover:translate-x-1 transition-transform"
            />
          
          <Link
            to="/courses" // رابط الأكاديمية
            className="text-white/80 hover:text-amber-400 font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 border border-white/20 hover:border-amber-400/50"
          >
            شاهد مسارات الأكاديمية
          </Link>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-400">
              +11,000
            </div>
            <div className="text-white/60 text-sm mt-1">طالب خدمناهم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-400">
              195
            </div>
            <div className="text-white/60 text-sm mt-1">عضو مدفوع</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-400">
              3
            </div>
            <div className="text-white/60 text-sm mt-1">مسارات تدريب</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-amber-400">
              100%
            </div>
            <div className="text-white/60 text-sm mt-1">تمويل يصل للطلاب</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;