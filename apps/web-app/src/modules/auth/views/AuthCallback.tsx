// src/modules/auth/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';

const AuthCallback = () => {
  // استخدام useSearch لجلب البرامات بشكل آمن
  const search = useSearch({ from: '/' }); // تأكد من مطابقة هذا المسار لما هو في routeTree.gen.ts
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // استخراج القيم من search
    const accessToken = (search as any).access_token;
    const refreshToken = (search as any).refresh_token;

    if (accessToken && refreshToken) {
      // حفظ التوكنز في localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // جلب بيانات المستخدم الحالي
      authService
        .fetchCurrentUser()
        .then((user) => {
          setSession(user, { accessToken, refreshToken });
          navigate({ to: '/courses', replace: true });
        })
        .catch(() => {
          setError('فشل جلب بيانات المستخدم.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      setError('فشل تسجيل الدخول: لم يتم استلام التوكنز من Google.');
    }
  }, [search, setSession, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050530] to-[#020038] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">خطأ</h2>
          <p className="text-white/70">{error}</p>
          <button
            onClick={() => navigate({ to: '/login' })}
            className="mt-4 text-amber-400 hover:text-amber-300"
          >
            العودة لتسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] to-[#020038] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
        <p className="text-white/80 text-lg">جاري إكمال تسجيل الدخول...</p>
      </div>
    </div>
  );
};

export default AuthCallback;