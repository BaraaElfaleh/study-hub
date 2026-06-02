// components/EcosystemSection.jsx (نقترح إعادة تسمية الملف)
import { Monitor, GraduationCap, Heart, Building } from "lucide-react";

const products = [
  {
    icon: Monitor,
    title: "سبيس نون",
    description:
      "كهرباء. إنترنت. هدوء. مجتمع. كل ما يحتاجه الفريلانسر ليُسلّم في وقته.",
    details:
      "مكان للطالب لمراجعة الامتحان، وللفريلانسر ليُسلم مشروعه في وقته. 195+ عضواً يعملون معنا اليوم.",
    cta: "احجز مقعدك — يبدأ من 15₪ لليوم",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: GraduationCap,
    title: "أكاديمية النون",
    description:
      "لا نعلّم للشهادة. نعلّم للدخل. مسار 90 يوماً ينتهي بأول عميل فريلانس.",
    details:
      "كل مسار ينتهي بمشروع تخرّج فعلي + بورتفوليو + أول عميل. مساراتنا اليوم: تصميم جرافيك، تطوير Front-End، إنجليزية العمل عن بُعد.",
    cta: "تصفّح المسارات الحالية",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Heart,
    title: "تمكين إنسان",
    description:
      "للطالب اللي ما يقدر يدفع. الممول يدفع. وأنت تتعلّم.",
    details:
      "مقاعد دراسة مجانية ممولة، إنترنت، كهرباء، وفرص تدريب مع منتورينج يومي. خدمنا 11,000+ طالب — ولم نتوقف يوماً.",
    cta: "تعرّف على البرنامج / مولّ مقعداً",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: Building,
    title: "للشركات (Q3 2026)",
    description:
      "مساحات مُدارة وفرق فريلانس مُختارة من خريجينا — جاهزة لشركتك.",
    details:
      "نوفّر للشركات مساحات عمل مُدارة لفِرَقها في غزة، وفرقاً جاهزة من خريجي الأكاديمية للمشاريع الرقمية.",
    cta: "سجّل اهتمامك",
    color: "from-orange-500 to-amber-400",
    badge: "قريباً",
  },
];

const EcosystemSection = () => {
  return (
    <section className="bg-[#040646] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            المنظومة المتكاملة
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            4 منتجات. باب واحد. منظومة لا تتوقف.
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            ما يميّز النون أن المنتجات ليست منفصلة — كل واحد يخدم الآخر، والطالب
            يدخل من أي باب فيخرج من المنظومة كلها.
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:bg-white/10 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/10 hover:-translate-y-2"
            >
              {product.badge && (
                <span className="absolute top-4 right-4 bg-amber-400/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {/* أيقونة متوهجة */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <product.icon size={28} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {product.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-white/50 text-xs leading-relaxed mb-6">
                {product.details}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors cursor-pointer">
                  {product.cta} ←
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;