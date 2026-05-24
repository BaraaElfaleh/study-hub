import { useState } from "react";
import {
  Search,
  Bell,
  Globe,
  User,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../../../../../../../packages/ui/src";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuthStore } from "../../../../modules/auth/store/authStore";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const { user, isAuthenticated } = useAuthStore();

  const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "الكورسات", to: "/courses" },          // ✅ موجود
    { label: "كورساتي", to: "/my-courses" },         // سيتم إنشاؤه
    { label: "تواصل معنا", to: "/contact" },         // سيتم إنشاؤه
    { label: "من نحن", to: "/about" },               // سيتم إنشاؤه
  ];

  const isActive = (path: string) => {
    // تفعيل الرابط النشط مع دعم المسارات الفرعية
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const iconButtonClass =
    "flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-white/70 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 active:scale-95";

  return (
    <nav dir="rtl" className="bg-gradient-to-r from-[#050252] via-[#070270] to-[#050252] backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-black/20">
      <div className="px-[4%] md:px-[6%]">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* اليمين: البراند */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:text-amber-400 hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-300"
          >
            النون
          </Link>

          {/* المنتصف: روابط التنقل */}
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
                <span
                  className={cn(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-blue-500 transition-all duration-300 ease-in-out rounded-full",
                    isActive(link.to)
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* اليسار: السيرشبار + الأيقونات */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* السيرشبار */}
            <div
              className={cn(
                "relative flex items-center bg-white/10 rounded-full transition-all duration-500",
                searchOpen
                  ? "w-40 sm:w-64 px-3 h-10 md:h-12"
                  : "w-10 md:w-12 h-10 md:h-12 justify-center"
              )}
            >
              <Search
                size={20}
                strokeWidth={1.5}
                className="text-white/70 cursor-pointer hover:text-amber-400 shrink-0"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              {searchOpen && (
                <input
                  autoFocus
                  placeholder="ابحث..."
                  className="w-full bg-transparent text-sm outline-none border-none ring-0 placeholder:text-white/40 font-medium mr-2 text-right text-white"
                />
              )}
            </div>

            {/* الجرس */}
            <button className={iconButtonClass}>
              <Bell size={22} strokeWidth={1.5} />
            </button>

            {/* تغيير اللغة */}
            <button className={iconButtonClass}>
              <Globe size={22} strokeWidth={1.5} />
            </button>

            {/* تسجيل الدخول / الملف الشخصي */}
            {isAuthenticated && user ? (
              <Link to="/profile" className={iconButtonClass}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-400/50"
                  />
                ) : (
                  <User size={20} className="text-amber-400" />
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className={cn(
                  iconButtonClass,
                  "bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-white"
                )}
              >
                <LogIn size={20} strokeWidth={2} />
              </Link>
            )}
          </div>

          {/* زر القائمة للجوال */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white/90"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة للجوال */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-gradient-to-b from-[#070270] to-[#050252] backdrop-blur-xl absolute w-full px-8 py-10 space-y-8 shadow-2xl animate-in fade-in slide-in-from-top-4 z-60">
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
            <div className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl text-white/90 text-sm">
              <span>بحث</span>
              <Search size={18} />
            </div>
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
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                <span>الملف الشخصي</span>
                <User size={18} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-end gap-4 p-4 bg-amber-400/10 rounded-2xl font-semibold text-amber-400 text-sm hover:bg-amber-400/20"
                onClick={() => setMobileOpen(false)}
              >
                <span>تسجيل الدخول</span>
                <LogIn size={18} />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};