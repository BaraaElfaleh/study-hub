// src/modules/profile/views/SettingsPage.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  Mail,
  Camera,
  ArrowLeft,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { useProfileStore } from "../store/profileStore";

const SettingsPage = () => {
  const { profile, updateProfile, isUpdating } = useProfile();
  const { avatarPreview, setAvatarPreview } = useProfileStore();

  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // حالة النافذة الحوارية لرابط الصورة
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // إرسال الحقول المدعومة فقط
    const payload: Record<string, any> = {
      firstName,
      lastName,
      email,
    };
    if (avatarPreview) {
      payload.avatarUrl = avatarPreview;
    }

    updateProfile(payload, {
      onSuccess: () => setSuccessMessage("تم تحديث الملف الشخصي بنجاح"),
      onError: () => setErrorMessage("حدث خطأ أثناء التحديث"),
    });
  };

  const handleSaveAvatarUrl = () => {
    if (avatarUrlInput.trim()) {
      setAvatarPreview(avatarUrlInput.trim());
    }
    setShowAvatarModal(false);
    setAvatarUrlInput("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038]"
      dir="rtl"
    >
      {/* تأثيرات الخلفية */}
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
            يمكنك تغيير بياناتك الشخصية (تغيير كلمة المرور غير متاح حالياً)
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* الصورة الرمزية */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5 border border-amber-400/30 flex items-center justify-center overflow-hidden">
                  {avatarPreview || profile?.avatarUrl ? (
                    <img
                      src={avatarPreview || profile?.avatarUrl}
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-amber-400" />
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 transition-colors"
                  onClick={() => setShowAvatarModal(true)}
                  title="تغيير الصورة"
                >
                  <Camera size={14} className="text-[#050530]" />
                </button>
              </div>
            </div>

            {/* الاسم الأول */}
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">
                الاسم الأول
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all text-right"
                  required
                />
              </div>
            </div>

            {/* الاسم الأخير */}
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">
                الاسم الأخير
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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

      {/* نافذة إدخال رابط الصورة */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a3c] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">تغيير الصورة</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="url"
              value={avatarUrlInput}
              onChange={(e) => setAvatarUrlInput(e.target.value)}
              placeholder="أدخل رابط الصورة الجديدة"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 transition-all text-left"
              dir="ltr"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveAvatarUrl}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-2 px-4 rounded-xl transition-colors"
              >
                حفظ
              </button>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;