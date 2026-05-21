import { useState } from "react";
import { Bell, Globe, Menu, X } from "lucide-react";
import { cn } from "../../../../packages/ui/src";
// import { useAuth } from "../modules/auth";
// import { useCart } from "../modules/cart/hooks/useCart";
import { Link, useLocation } from "@tanstack/react-router";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "الكورسات", to: "/courses" },
    { label: "كورساتي", to: "/my-courses" },
    { label: "تواصل معنا", to: "/contact" },
    { label: "من نحن", to: "/about" },
  ];

  const isActive = (path: string) => currentPath === path;

  const iconButtonClass =
    "flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-white/70 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 active:scale-95";

  return (
    <nav className="bg-linear-to-r from-[#050252] via-[#070270] to-[#050252] backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-black/20">
      <div className="px-[4%] md:px-[6%]">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* ========== الجانب الأيسر: زر EN ========== */}
          <div className="flex items-center">
            <button className="rounded-full border border-amber-400/50 px-5 py-2 text-base font-medium text-amber-400 hover:bg-amber-400 hover:text-white hover:border-amber-400 hover:-translate-y-1 shadow-[0_0_10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-300">
              EN
            </button>
          </div>

          {/* ========== المنتصف: القائمة الرئيسية (مخفي على الجوال) ========== */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "relative group text-lg font-medium transition-all duration-300",
                  isActive(link.to)
                    ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                    : "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                )}
              >
                {link.label}
                {/* خط متدرج نحيف يظهر عند التفعيل أو الهوفر */}
                <span
                  className={cn(
                    "absolute -bottom-3 left-0 h-0.5 bg-linear-to-r from-amber-400 to-blue-500 transition-all duration-500 ease-in-out rounded-full",
                    isActive(link.to)
                      ? "w-full opacity-100"
                      : "w-full opacity-0 group-hover:opacity-100"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* ========== الجانب الأيمن: الشعار + أيقونة الجرس ========== */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* أيقونة الجرس */}
            <button className={iconButtonClass}>
              <Bell size={22} strokeWidth={1.5} />
            </button>

            {/* الشعار مع تأثير التوهج */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:text-amber-400 hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-300"
            >
              النون
            </Link>
          </div>

          {/* ========== زر القائمة للجوال ========== */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white/90 ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ========== القائمة المنسدلة للجوال ========== */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-linear-to-b from-[#070270] to-[#050252] backdrop-blur-xl absolute w-full px-8 py-10 space-y-8 shadow-2xl animate-in fade-in slide-in-from-top-4 z-60">
          <div className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "block text-xl font-bold text-right transition-colors",
                  isActive(item.to)
                    ? "text-amber-400"
                    : "text-white hover:text-amber-400"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 grid grid-cols-1 gap-3">
            <button
              className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <span>الإشعارات</span>
              <Bell size={18} />
            </button>
            <button
              className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <span>English</span>
              <Globe size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};