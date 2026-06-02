// components/StatsSection.jsx
import { Users, CalendarCheck, BookOpen, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ target }: { target: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/[^0-9]/g, ""));
    if (isNaN(end)) return;
    const duration = 2000;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {target.includes("+") ? "+" : target.includes("%") ? "%" : ""}
    </span>
  );
};

const stats = [
  { icon: Users, value: "11,000+", label: "طالب وفريلانسر خدمناهم منذ أكتوبر 2023" },
  { icon: CalendarCheck, value: "195", label: "عضو مدفوع في سبيس نون (أبريل 2026)" },
  { icon: BookOpen, value: "3", label: "مسارات تدريب نشطة" },
  { icon: Heart, value: "100%", label: "من تمويل الممولين يصل لأنشطة الطلاب" },
];

const StatsSection = () => {
  return (
    <section className="bg-[#050530] py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            بالأرقام، لا بالكلام
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            سنتان لم نُغلق فيهما يوماً واحداً
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-all duration-300">
                <stat.icon size={28} className="text-amber-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                <AnimatedNumber target={stat.value} />
              </div>
              <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;