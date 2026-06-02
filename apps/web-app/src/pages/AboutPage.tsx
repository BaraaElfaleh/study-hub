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
    name: 'علاء الخضري',
    role: 'المدير العام',
    bio: 'يقود الاستراتيجية والشراكات.',
  },
  {
    name: 'حازم الهنداوي',
    role: 'مدير العمليات والمالية',
    bio: 'يحمي كل شيكل ويتتبع كل قرار بالأرقام.',
  },
  {
    name: 'أماني',
    role: 'مديرة التسويق',
    bio: 'تروي قصة النون لمن يجب أن يسمعها.',
  },
  {
    name: 'غيداء اللحام',
    role: 'تجربة المستخدم والمبيعات',
    bio: 'تتأكد أن كل عميل يعود في المرة الثانية.',
  },
];

const values = [
  {
    icon: Target,
    title: 'المهمة',
    description:
      'نحوّل الإنسان من "محتاج" إلى "منتِج" — بمكان يقدر يشتغل فيه، ومهارة تجلب دخلاً، ومجتمع لا يتركه وحده.',
  },
  {
    icon: Eye,
    title: 'الرؤية',
    description:
      'أن نكون البنية التحتية البديلة للجيل الفلسطيني الذي يبني نفسه بمهارة العصر الرقمي.',
  },
  {
    icon: Heart,
    title: 'القيم',
    description:
      'الإنسان أولاً. المهارة تتحول لدخل. الصدق المالي. الاستمرار. المجتمع قبل الفرد. الكرامة لا الاستجداء.',
  },
];

const AboutPage = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038]"
      dir="rtl"
    >
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* ========== Hero ========== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-5 py-2 mb-8">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              قصة النون
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            بدأنا{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              قبل الحرب
            </span>
            .<br />
            لم نتوقف{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
              بعدها
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            قصة شركة فلسطينية اختارت أن تكون بنية بديلة في غزة، بدلاً من انتظار
            أن يعود كل شيء كما كان.
          </p>
        </div>

        {/* ========== التاريخ ========== */}
        <div className="max-w-3xl mx-auto mb-20 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              قبل الحرب، كانت غزة تختنق
            </h2>
            <p className="text-white/60 leading-relaxed">
              في 2023، الجامعات تشتغل لكن سوق العمل ما يكفي. الفريلانس بدا
              مخرجاً للجيل الجديد، لكن لا يوجد مكان لاحتضانه. بدأنا النون
              كمساحة عمل صغيرة في قلب مدينة غزة، تجمع بين الجدّية والمجتمع.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ثم جاءت الحرب
            </h2>
            <p className="text-white/60 leading-relaxed">
              الجامعات تعطلت. البيوت تضررت. الكهرباء انقطعت لأسابيع. لم نُغلق.
              وسّعنا. أضفنا الأكاديمية لأن الطلاب احتاجوا مهارات سريعة تتحول
              إلى دخل. أضفنا تمكين إنسان لأن آلاف الطلاب لم يستطيعوا الدفع.
              صرنا أكثر من مساحة عمل — صرنا بنية بديلة.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">اليوم</h2>
            <p className="text-white/60 leading-relaxed">
              نخدم 195 عضواً مدفوعاً في السبيس، وأكثر من 11,000 طالب عبر برامج
              التمكين. لدينا 3 مسارات تدريب نشطة. وما زلنا نبني.
            </p>
          </div>
        </div>

        {/* ========== المهمة والرؤية والقيم ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center mb-5">
                <item.icon size={28} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ========== فريق العمل ========== */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            فريق <span className="text-amber-400">النون</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-amber-400/20">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-amber-400 text-sm mb-3">{member.role}</p>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== إحصائيات ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: '11,000+', label: 'طالب خدمناهم' },
            { value: '195', label: 'عضو مدفوع في سبيس نون' },
            { value: '3', label: 'مسارات تدريب نشطة' },
            { value: '100%', label: 'تمويل يصل للطلاب' },
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

        {/* ========== CTA ========== */}
        <div className="bg-gradient-to-r from-amber-400/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <Users size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            تعرفنا الآن. ما الخطوة التالية؟
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            اختر مسارك معنا — وسنقابلك حيث أنت.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tsx/classroom/space"
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
            >
              أنا أريد مساحة عمل
            </Link>
            <Link
              to="/tsx/courses"
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30"
            >
              أنا أريد مهارة
            </Link>
            <Link
              to="/about"
              className="text-white/80 hover:text-amber-400 font-medium px-8 py-3 rounded-xl border border-white/20 hover:border-amber-400/50 transition-all duration-300"
            >
              أنا شريك محتمل
            </Link>
          </div>
        </div>

        {/* ========== العودة للرئيسية ========== */}
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