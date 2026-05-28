// components/StatsSection.jsx
import { Users, Clock, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// مكون عدّاد بسيط
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

  return <span>{count.toLocaleString()}{target.includes("+") ? "+" : target.includes("%") ? "%" : ""}</span>;
};

const stats = [
  { icon: Users, value: "11,000+", label: "طالب مسجل" },
  { icon: Clock, value: "730", label: "يوم بلا توقف" },
  { icon: Award, value: "195", label: "كورس متخصص" },
  { icon: Globe, value: "22", label: "دولة عربية" },
];

const StatsSection = () => {
  return (
    <section className="bg-[#050530] py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-400/10 flex items-center justify-center"
                whileHover={{ backgroundColor: "rgba(251,191,36,0.2)" }}
              >
                <stat.icon size={28} className="text-amber-400" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                <AnimatedNumber target={stat.value} />
              </div>
              <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;