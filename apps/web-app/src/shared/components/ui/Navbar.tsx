import { useState } from "react";
import { Bell, Globe, User, LogIn, Menu, X } from "lucide-react";
import { cn } from "../../../../../../packages/ui"; // تأكد من المسار الصحيح لدالة cn
import { Link, useLocation } from "@tanstack/react-router";
import { useAuthStore } from "../../../modules/auth/store/authStore";
import { useNotificationStore } from "../../../modules/notifications/store/notificationStore";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const { user, isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "الكورسات", to: "/courses" },
    { label: "كورساتي", to: "/classroom/my-courses" },
    { label: "تواصل معنا", to: "/contact" },
    { label: "من نحن", to: "/about" },

  ];

  // دالة دقيقة لتحديد الرابط النشط
  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  // كلاس مشترك للأيقونات مع relative إجباري للشارات
  const iconButtonClass =
    "relative flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-white/70 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 active:scale-95";

  return (
    <nav
      dir="rtl"
      className="bg-linear-to-r from-[#050252] via-[#070270] to-[#050252] backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-all duration-500 shadow-lg shadow-black/20"
    >
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
                    : "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-3 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-amber-400 to-blue-500 transition-all duration-300 ease-in-out rounded-full",
                    isActive(link.to)
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                  )}
                />
              </Link>
            ))}
          </div>

          {/* اليسار: السيرشبار + الأيقونات */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* السيرشبار */}

            {/* الجرس مع شارة الإشعارات */}
            <Link to="/notifications" className={iconButtonClass}>
              <Bell size={22} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#050252]">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* تغيير اللغة */}
            <button className={iconButtonClass}>
              <Globe size={22} strokeWidth={1.5} />
            </button>

            {/* تسجيل الدخول / الملف الشخصي */}
            {isAuthenticated && user ? (
              <Link
                to="/profile/$userId"
                className={iconButtonClass}
                params={{ userId: user.id }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.firstName}
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
                  "bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-white",
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
                    : "text-white hover:text-amber-400",
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
            </div>
            <Link
              to="/notifications"
              className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <span>الإشعارات</span>
              <Bell size={18} />
            </Link>
            <button
              className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <span>English</span>
              <Globe size={18} />
            </button>
            {isAuthenticated ? (
              <Link
                to="/profile/$userId"
                className="flex items-center justify-end gap-4 p-4 bg-white/5 rounded-2xl font-semibold text-white/90 text-sm hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
                params={{ userId: user?.id ?? "" }}
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
