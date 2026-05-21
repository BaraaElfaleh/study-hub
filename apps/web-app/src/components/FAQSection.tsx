// components/FAQSection.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "هل النون جمعية أم شركة؟",
    answer:
      "النون شركة مسجلة باسم \"شركة النون للحلول الرقمية المتكاملة\". لدينا برنامج اجتماعي اسمه \"تمكين إنسان\" يموله شركاء خارجيون، لكن النون ليست جمعية – نحن نموذج هجين: أرباحنا التجارية تخدم رسالتنا الاجتماعية.",
  },
  {
    question: "كيف أعرف أن دورات الأكاديمية مختلفة عن أي مركز تدريب؟",
    answer:
      "بكلمة واحدة: التركيز. لا نعلّم 'كل شيء' – نعلّم فقط مهارات تتحول إلى دخل فريلانس. كل دورة تنتهي بمشروع تخرج فعلي وبورتفوليو، ونساعدك في الحصول على أول عميل. الشهادة عندنا ليست هدفاً – الدخل هو الهدف.",
  },
  {
    question: "هل أستطيع استخدام السبيس وأنا طالب لا أستطيع الدفع؟",
    answer:
      "نعم. عبر برنامج تمكين إنسان نقدم مقاعد مجانية للطلاب الممولة من شركاتنا. قدّم طلباً عبر صفحة تمكين، وسنتواصل معك خلال 48 ساعة.",
  },
  {
    question: "كيف يستفيد الممول من تمويل النون عوضاً عن جمعية تقليدية؟",
    answer:
      "لأن النموذج التقليدي يصرف 30-40% من تمويلك على رواتب وإيجارات قبل أن يصل أي شيء للطالب. في النون، شركتنا التجارية تتحمل كل تكاليف التشغيل – 100% من تمويلك يذهب مباشرة لأنشطة الطلاب.",
  },
  {
    question: "هل تعملون مع شركاء من خارج فلسطين؟",
    answer:
      "نعم. شريكنا الرئيسي حالياً (Scot Aid (Edinburgh, UK. نتلقى تحويلات دولية ولدينا تقارير منفصلة بالإنجليزية لكل ممول.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#050530] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            كل ما تريد معرفته
          </h2>
        </div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-400/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-right"
              >
                <span className="text-white font-medium text-sm md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-amber-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 pb-5 md:pb-6"
                    : "max-h-0"
                }`}
              >
                <p className="text-white/60 text-sm leading-relaxed text-right">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;