// components/Testimonials.jsx
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "محمد، 21 سنة",
    role: "دفعة فبراير 2026",
    text: "دخلت أدرس Front-End وأنا ما أعرف HTML. بعد 4 أشهر، عندي 3 عملاء على Upwork.",
    rating: 5,
  },
  {
    name: "لينا، 26 سنة",
    role: "مصممة جرافيك Remote",
    text: "في كل مرة تنقطع الكهرباء عن البيت، السبيس مفتوح. مشروعي ما تأخر يوماً واحداً.",
    rating: 5,
  },
  {
    name: "أحمد، 23 سنة",
    role: "خريج تمكين 2025",
    text: "تخرّجت من الجامعة ولا أعرف إيش أعمل. تمكين فتحلي الباب الأول، وبعدها بنيت بورتفوليو حقيقي.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#040646] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            قصص حقيقية
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            دخلوا النون. خرجوا مختلفين.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-amber-400/20 hover:bg-white/8 transition-all duration-300"
            >
              <Quote size={32} className="text-amber-400/40 mb-4" />
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                {item.text}
              </p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-white">{item.name}</div>
                <div className="text-white/50 text-sm">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;