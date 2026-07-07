import { useState, useEffect } from 'react';
import { useCoupons } from '../hooks/useCoupons';
import { useCouponsStore } from '../store/couponsStore';
import type { CreateCouponRequest } from '../../../shared/types/coupon';

export default function CouponForm() {
  const { isFormOpen, editingCoupon, closeForm } = useCouponsStore();
  const { createCoupon, updateCoupon } = useCoupons();
  const [form, setForm] = useState<CreateCouponRequest>({
    title: '',
    code: '',
    discountPercentage: 10,
    description: '',
    maxUses: 100,
  });

  useEffect(() => {
    if (editingCoupon) {
      setForm({
        title: editingCoupon.title,
        code: editingCoupon.code,
        discountPercentage: editingCoupon.discountPercentage,
        description: editingCoupon.description || '',
        maxUses: editingCoupon.maxUses,
      });
    } else {
      setForm({ title: '', code: '', discountPercentage: 10, description: '', maxUses: 100 });
    }
  }, [editingCoupon, isFormOpen]);

  if (!isFormOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon({ id: editingCoupon.id, payload: form });
    } else {
      createCoupon(form);
    }
    closeForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0a0a3c] border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-white font-bold text-lg mb-4">
          {editingCoupon ? 'تعديل كوبون' : 'كوبون جديد'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="العنوان" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          />
          <input
            type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="الكود" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          />
          <input
            type="number" value={form.discountPercentage}
            onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })}
            placeholder="نسبة الخصم" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          />
          <textarea
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="وصف (اختياري)" rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          />
          <input
            type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })}
            placeholder="الحد الأقصى للاستخدام" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={closeForm} className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#050530] rounded-xl font-medium">
              {editingCoupon ? 'حفظ' : 'إنشاء'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}