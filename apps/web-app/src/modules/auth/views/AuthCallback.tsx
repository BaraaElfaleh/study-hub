// src/modules/auth/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { authService } from '../api/authService';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // حفظ التوكنز في localStorage أولاً
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // جلب بيانات المستخدم الحالي
      authService
        .fetchCurrentUser()
        .then((user) => {
          setSession(user, { accessToken, refreshToken });
          navigate({ to: '/tsx/dashboard', replace: true });
        })
        .catch(() => {
          setError('فشل جلب بيانات المستخدم.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        });
    } else {
      setError('فشل تسجيل الدخول: لم يتم استلام التوكنز من Google.');
    }
  }, []);

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