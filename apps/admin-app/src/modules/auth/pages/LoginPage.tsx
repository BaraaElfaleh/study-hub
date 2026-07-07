import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); login({ email, password }); };
  const msg = (error as any)?.response?.data?.message || (error as any)?.message || 'بيانات الدخول غير صحيحة';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">لوحة الإدارة</h1>
          <p className="text-white/60 mt-2">تسجيل دخول المشرفين</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@noon.com" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50" dir="ltr" />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2 text-right">كلمة المرور</label>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50" />
              </div>
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-right">{msg}</div>}
            <button type="submit" disabled={isLoading} className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? 'جاري الدخول...' : <><Sparkles size={20} /> دخول</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}