// apps/admin-app/src/modules/auth/views/ForgotPasswordPage.tsx
import { useState } from 'react';
import { Button, Input } from '../../../shared/components/ui';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // محاكاة إرسال بريد
    setTimeout(() => setSent(true), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">استعادة كلمة المرور</h1>
              <p className="text-slate-400 mt-2">أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="البريد الإلكتروني"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">إرسال</Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-green-400 text-lg mb-2">تم الإرسال!</p>
            <p className="text-slate-400">تحقق من بريدك الإلكتروني</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;