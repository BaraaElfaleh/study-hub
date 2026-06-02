// components/Footer.jsx
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="bg-[#020038] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* شعار ووصف */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            >
              النون
            </Link>
            <p className="text-white/50 text-sm mt-4 leading-relaxed">
              شركة النون للحلول الرقمية المتكاملة — مكان لتمكين الإنسان وتطوير
              البرامج. غزة، فلسطين.
            </p>
            {/* أيقونات التواصل الاجتماعي (يمكن إضافتها لاحقًا) */}
          </div>

          {/* البرامج */}
          <div>
            <h3 className="text-white font-bold mb-5">البرامج</h3>
            <ul className="space-y-3">
              {["سبيس نون", "أكاديمية النون", "تمكين إنسان", "للشركات (قريباً)"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* الشركة */}
          <div>
            <h3 className="text-white font-bold mb-5">الشركة</h3>
            <ul className="space-y-3">
              {["من نحن", "الشركاء والممولون", "تواصل معنا"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* تواصل */}
          <div>
            <h3 className="text-white font-bold mb-5">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-amber-400" />
                غزة — شارع عمر المختار
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={16} className="text-amber-400" />
                info@noonsolutions.com
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={16} className="text-amber-400" />
                +972 56 709 8648
              </li>
            </ul>
          </div>
        </div>

        {/* الحد السفلي */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} شركة النون للحلول الرقمية المتكاملة. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <span className="text-white/40 text-xs">
              مسجّلة في غزة — فلسطين
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;