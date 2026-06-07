// apps/admin-app/src/modules/settings/views/SettingsPage.tsx
import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { Button, Input, Loader } from '../../../shared/components/ui';
import { Save, CheckCircle } from 'lucide-react';

const SettingsPage = () => {
  const { settings, isLoading, error, updateSettings, isUpdating, isSuccess } = useSettings();

  const [form, setForm] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    allowRegistration: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل الإعدادات</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">إعدادات المنصة</h1>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <Input
          label="اسم المنصة"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          required
        />
        <div>
          <label className="text-sm font-medium text-slate-300 mb-1 block">وصف المنصة</label>
          <textarea
            value={form.siteDescription}
            onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            rows={3}
          />
        </div>
        <Input
          label="البريد الإلكتروني للتواصل"
          type="email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        />
        <Input
          label="رقم الهاتف"
          value={form.contactPhone}
          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
        />
        <Input
          label="العنوان"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.allowRegistration}
            onChange={(e) => setForm({ ...form, allowRegistration: e.target.checked })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
          />
          <label className="text-slate-300 text-sm">السماح بتسجيل المستخدمين الجدد</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.maintenanceMode}
            onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
          />
          <label className="text-slate-300 text-sm">وضع الصيانة</label>
        </div>

        {isSuccess && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle size={16} />
            تم حفظ الإعدادات بنجاح
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" disabled={isUpdating} className="flex items-center gap-2">
            <Save size={16} />
            {isUpdating ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;