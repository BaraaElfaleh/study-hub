import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    intent: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', contact: '', intent: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-12 md:py-20"
      dir="rtl"
    >
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            اكتب لنا.
            <br />
            نرد <span className="text-amber-400">خلال 24 ساعة</span>.
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            أيا كنت — طالب، فريلانسر، Remote، ممول، أو شركة — نوع طلبك يحدد من
            يتولّى الرد عليك من فريقنا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* معلومات الاتصال - الجانب الأيمن */}
          <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            <h3 className="text-xl font-bold text-white mb-4">
              طرق الوصول المباشر
            </h3>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">WhatsApp</h3>
                <p className="text-white/60 text-sm mb-2">
                  الأسرع. نرد خلال ساعات.
                </p>
                <a
                  href="https://wa.me/972567098648"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                  dir="ltr"
                >
                  +972 56 709 8648
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">البريد الإلكتروني</h3>
                <p className="text-white/60 text-sm mb-2">
                  للأمور الرسمية والشراكات.
                </p>
                <a
                  href="mailto:info@noonsolutions.com"
                  className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                  dir="ltr"
                >
                  info@noonsolutions.com
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">العنوان</h3>
                <p className="text-white/70 text-sm">
                  غزة — شارع عمر المختار
                  <br />
                  عمارة القصاص، الطابق الأول
                </p>
              </div>
            </div>
          </div>

          {/* نموذج الاتصال - الجانب الأيسر */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/30">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={64} className="text-amber-400 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">
                    تم الإرسال بنجاح!
                  </h2>
                  <p className="text-white/60">
                    شكراً لتواصلك معنا. سنقوم بالرد عليك خلال 24 ساعة.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm mb-2 text-right">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="..."
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2 text-right">
                      البريد أو واتساب
                    </label>
                    <input
                      type="text"
                      value={form.contact}
                      onChange={(e) =>
                        setForm({ ...form, contact: e.target.value })
                      }
                      placeholder="email@... | +972..."
                      required
                      dir="ltr"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2 text-right">
                      أنا...
                    </label>
                    <select
                      value={form.intent}
                      onChange={(e) =>
                        setForm({ ...form, intent: e.target.value })
                      }
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right appearance-none"
                    >
                      <option value="" disabled>
                        اختر
                      </option>
                      <option value="student">طالب</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="remote">Remote worker</option>
                      <option value="donor">Donor / Partner / NGO</option>
                      <option value="business">Business</option>
                      <option value="press">Press / Journalist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2 text-right">
                      كيف نقدر نخدمك؟
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="..."
                      rows={5}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    أرسل الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;