// src/modules/profile/views/SettingsPage.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  Mail,
  Lock,
  Camera,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { useProfileStore } from "../store/profileStore";

const SettingsPage = () => {
  const { profile, updateProfile, isUpdating } = useProfile();
  const { avatarPreview, setAvatarPreview } = useProfileStore();

  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("كلمة المرور الجديدة غير متطابقة");
      return;
    }

    updateProfile(
      {
        name,
        email,
        avatar: avatarPreview || undefined,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      },
      {
        onSuccess: () => setSuccessMessage("تم تحديث الملف الشخصي بنجاح"),
        onError: () => setErrorMessage("حدث خطأ أثناء التحديث"),
      },
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038]"
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            تعديل الملف الشخصي
          </h1>
          <p className="text-white/60 mt-2">
            يمكنك تغيير بياناتك الشخصية وكلمة المرور
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* الصورة الرمزية */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/30 flex items-center justify-center">
                  {avatarPreview || profile?.avatar ? (
                    <img
                      src={avatarPreview || profile?.avatar}
                      alt={name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-amber-400" />
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 transition-colors"
                  onClick={() => {
                    const url = prompt("أدخل رابط الصورة الجديدة:");
                    if (url) setAvatarPreview(url);
                  }}
                  title="تغيير الصورة"
                >
                  <Camera size={14} className="text-[#050530]" />
                </button>
              </div>
            </div>

            {/* الاسم */}
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">
                الاسم الكامل
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  required
                />
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/80 text-sm mb-4">
                تغيير كلمة المرور (اختياري)
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="كلمة المرور الحالية"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  />
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  />
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="تأكيد كلمة المرور الجديدة"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  />
                </div>
              </div>
            </div>

            {/* رسائل الخطأ والنجاح */}
            {errorMessage && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-green-400 text-sm">
                <Check size={16} />
                {successMessage}
              </div>
            )}

            {/* زر الحفظ */}
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/tsx/profile/$userId"
            params={{ userId: profile?.id ?? "" }}
            className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors duration-300 text-sm"
          >
            <ArrowLeft size={16} />
            العودة للملف الشخصي
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
