// components/CardsSection.jsx
import { BookOpen, Code, Palette, TrendingUp } from "lucide-react";

const courses = [
  {
    icon: Code,
    title: "تطوير الويب",
    description: "تعلم بناء مواقع وتطبيقات ويب احترافية من الصفر للإحتراف",
    color: "from-blue-500 to-cyan-400",
    students: 3200,
  },
  {
    icon: Palette,
    title: "التصميم الجرافيكي",
    description: "أتقن فنون التصميم والإبداع البصري بأدوات احترافية",
    color: "from-purple-500 to-pink-400",
    students: 2800,
  },
  {
    icon: TrendingUp,
    title: "التسويق الرقمي",
    description: "استراتيجيات متقدمة في التسويق الإلكتروني ووسائل التواصل",
    color: "from-green-500 to-emerald-400",
    students: 4100,
  },
  {
    icon: BookOpen,
    title: "الذكاء الاصطناعي",
    description: "ادخل عالم المستقبل مع دورات متخصصة في AI وتعلم الآلة",
    color: "from-orange-500 to-amber-400",
    students: 1900,
  },
];

const CardsSection = () => {
  return (
    <section className="bg-[#040646] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            برامجنا التعليمية
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            اختر مسارك الاحترافي
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            أربعة مسارات رئيسية تغطي أهم مجالات التقنية الحديثة، صممها خبراء
            لتنقلك من المبتدئ إلى المحترف
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:bg-white/10 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/10 hover:-translate-y-2"
            >
              {/* أيقونة متوهجة */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <course.icon size={28} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {course.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-amber-400 text-sm font-medium">
                  {course.students.toLocaleString()} طالب
                </span>
                <span className="text-white/50 text-sm group-hover:text-amber-400 transition-colors cursor-pointer">
                  تصفح الكورس ←
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;