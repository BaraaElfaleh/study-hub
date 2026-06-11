import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from '@tanstack/react-router';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { register, registerError, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('كلمة المرور غير متطابقة');
      return;
    }
    register({
      email,
      password,
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ')[1] || '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white">النون</h1>
          </Link>
          <p className="text-white/60 mt-2 text-sm">انضم إلى مجتمع النون التعليمي</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">إنشاء حساب جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">الاسم الكامل</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="محمد أحمد" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-right" dir="rtl" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">البريد الإلكتروني</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-right" dir="rtl" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-right" dir="rtl" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">تأكيد كلمة المرور</label>
              <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-right" dir="rtl" />
            </div>
            {registerError && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-right">حدث خطأ أثناء التسجيل</div>}
            <button type="submit" disabled={isLoading} className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 rounded-xl">{isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}</button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-white/50 text-sm">لديك حساب؟ </span>
            <Link to="/login" className="text-amber-400 text-sm">تسجيل الدخول</Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-white/50 text-sm">العودة للرئيسية</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;