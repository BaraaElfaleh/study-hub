// components/Testimonials.jsx
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "مطور ويب - مصر",
    text: "دخلت النون وما كنت أعرف شيئاً عن البرمجة. بعد 6 شهور فقط، حصلت على أول وظيفة لي كمطور Frontend. التجربة غيرت حياتي.",
    rating: 5,
  },
  {
    name: "فاطمة علي",
    role: "مصممة جرافيك - السعودية",
    text: "أفضل منصة تعليمية جربتها على الإطلاق. المحتوى محدث والمدربون خبراء حقيقيون. أنصح بها كل من يريد التعلم بجدية.",
    rating: 5,
  },
  {
    name: "كريم بن سعيد",
    role: "مسوق رقمي - الجزائر",
    text: "التسويق الرقمي كان حلماً بعيداً، لكن مع كورسات النون العملية، تمكنت من إطلاق مشروعي الخاص وتحقيق أرباح خلال 3 أشهر.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#040646] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            قصص نجاح
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            دخلوا النون. خرجوا مختلفين.
          </h2>
        </div>

        {/* شبكة التوصيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-amber-400/20 hover:bg-white/8 transition-all duration-300"
            >
              {/* أيقونة اقتباس */}
              <Quote size={32} className="text-amber-400/40 mb-4" />

              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                {item.text}
              </p>

              {/* النجوم */}
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