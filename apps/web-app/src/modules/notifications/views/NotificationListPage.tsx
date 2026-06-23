import { useNotifications } from "../hooks/useNotifications";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Megaphone,
  ClipboardList,
  MessageCircle,
  GraduationCap,
  CheckCircle,
  Loader2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  announcement: Megaphone,
  task_due: ClipboardList,
  new_chat: MessageCircle,
  enrollment: GraduationCap,
};
const colorMap: Record<string, string> = {
  announcement: "text-blue-400 bg-blue-400/10",
  task_due: "text-amber-400 bg-amber-400/10",
  new_chat: "text-green-400 bg-green-400/10",
  enrollment: "text-purple-400 bg-purple-400/10",
};

const NotificationListPage = () => {
  const {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    isMarkingAll,
  } = useNotifications();
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-amber-400" size={32} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20">
        <p className="text-red-400">فشل تحميل الإشعارات</p>
      </div>
    );
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038]"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            الإشعارات
          </h1>
          {notifications.filter((n) => !n.read).length > 0 && (
            <button
              onClick={() => markAllAsRead()}
              disabled={isMarkingAll}
              className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1 disabled:opacity-50 transition-colors"
            >
              <CheckCircle size={16} />
              {isMarkingAll ? "جاري التحديد..." : "تحديد الكل كمقروء"}
            </button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={64} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">لا توجد إشعارات حتى الآن</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const Icon = iconMap[notif.type] || Bell;
              const colorClass =
                colorMap[notif.type] || "text-amber-400 bg-amber-400/10";
              return (
                <div
                  key={notif.id}
                  className={`relative backdrop-blur-lg border rounded-2xl p-5 transition-all hover:bg-white/5 ${!notif.read ? "bg-amber-400/5 border-amber-400/20 shadow-md shadow-amber-400/5" : "bg-white/5 border-white/10"}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-white font-semibold truncate">
                          {notif.title}
                        </h3>
                        <span className="text-white/40 text-xs shrink-0">
                          {notif.createdAt}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-2 line-clamp-2">
                        {notif.message}
                      </p>
                      {notif.link && (
                        <Link
                          to={notif.link}
                          className="inline-block mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                          onClick={() => {
                            if (!notif.read) markAsRead(notif.id);
                          }}
                        >
                          عرض التفاصيل ←
                        </Link>
                      )}
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 self-center" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationListPage;
