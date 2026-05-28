// src/routes/about.tsx أو src/modules/about/views/AboutPage.tsx
import { Link } from '@tanstack/react-router';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Heart, 
  Users, 
  ArrowLeft,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'أحمد الخالدي',
    role: 'المؤسس والرئيس التنفيذي',
    avatar: null, // يمكنك إضافة رابط صورة
    bio: 'رائد أعمال ومطور برمجيات بخبرة 15 عاماً في التعليم التقني',
  },
  {
    name: 'سارة العمري',
    role: 'مديرة المحتوى التعليمي',
    avatar: null,
    bio: 'مصممة تعليمية حاصلة على ماجستير في تكنولوجيا التعليم',
  },
  {
    name: 'خالد الناصر',
    role: 'المدير التقني',
    avatar: null,
    bio: 'مهندس برمجيات متخصص في الذكاء الاصطناعي وتطوير المنصات',
  },
];

const values = [
  {
    icon: Target,
    title: 'مهمتنا',
    description: 'تمكين الشباب العربي من اكتساب مهارات تقنية حقيقية تؤهلهم لسوق العمل الرقمي من خلال تجربة تعليمية عملية وشخصية.',
  },
  {
    icon: Eye,
    title: 'رؤيتنا',
    description: 'أن نكون المنصة التعليمية الأولى في العالم العربي التي تدمج بين التعلم النظري والتطبيق العملي بروح الابتكار والتميز.',
  },
  {
    icon: Heart,
    title: 'قيمنا',
    description: 'نؤمن بأن التعليم حق للجميع. نلتزم بالجودة، الشفافية، والتركيز على النتائج العملية قبل الشهادات.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038]" dir="rtl">
      {/* تأثيرات خلفية (نقاط مضيئة وتوهج) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* ========== قسم Hero ========== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2 mb-8">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              قصتنا بدأت من شغف التعليم
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            من نحن؟
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            النون هي أكثر من مجرد أكاديمية تعليمية. نحن مجتمع من المتعلمين والمبدعين الذين يؤمنون بأن 
            <span className="text-amber-400 font-semibold"> المعرفة الحقيقية </span>
            تُبنى بالممارسة والخبرة العملية. بدأنا رحلتنا عام 2024 بهدف 
            <span className="text-amber-400 font-semibold"> سد الفجوة </span>
            بين التعليم النظري ومتطلبات سوق العمل الرقمي.
          </p>
        </div>

        {/* ========== قسم الرؤية والمهمة والقيم ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center mb-5">
                <item.icon size={28} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* ========== فريق العمل ========== */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            فريق <span className="text-amber-400">النون</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-amber-400/20">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-amber-400 text-sm mb-3">{member.role}</p>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== إحصائيات سريعة ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: '11,000+', label: 'طالب مسجل' },
            { value: '195', label: 'كورس تعليمي' },
            { value: '730', label: 'يوم بلا توقف' },
            { value: '22', label: 'دولة عربية' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-400/20 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ========== دعوة للانضمام ========== */}
        <div className="bg-linear-to-r from-amber-400/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <Users size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            انضم إلى مجتمع النون
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            كن جزءاً من آلاف المتعلمين الذين يطورون مهاراتهم كل يوم مع النون.
            ابدأ رحلتك التعليمية اليوم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tsx/courses"
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
            >
              تصفح الكورسات
            </Link>
            <Link
              to="/register"
              className="text-white/80 hover:text-amber-400 font-medium px-8 py-3 rounded-xl border border-white/20 hover:border-amber-400/50 transition-all duration-300"
            >
              إنشاء حساب مجاني
            </Link>
          </div>
        </div>

        {/* ========== رابط العودة للرئيسية ========== */}
        <div className="text-center mt-12">
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

export default AboutPage;