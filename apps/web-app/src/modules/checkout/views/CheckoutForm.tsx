// src/modules/checkout/views/CheckoutForm.tsx
import { useState, type FormEvent } from "react";
import valid from "card-validator";
import { useCheckout } from "../hooks/useCheckout";
import type { CheckoutRequest } from "../../../shared/types/checkout";

interface CheckoutFormProps {
  courseId: string;
  courseName: string;
  coursePrice: number;
  onSuccess?: (transactionId: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  courseId,
  courseName,
  coursePrice,
  onSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const {
    coupon,
    couponError,
    isApplyingCoupon,
    applyCoupon,
    finalPrice,
    isSubmitting,
    submitError,
    transactionId,
    submitCheckout,
  } = useCheckout(coursePrice);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) raw = raw.slice(0, 2) + "/" + raw.slice(2);
    setExpiry(raw);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!valid.number(cardNumber.replace(/\s/g, "")).isValid)
      errors.cardNumber = "رقم البطاقة غير صالح";

    if (!valid.expirationDate(expiry).isValid)
      errors.expiry = "تاريخ الانتهاء غير صحيح";

    if (!valid.cvv(cvc).isValid)
      errors.cvc = "رمز CVC غير صحيح";

    if (!name.trim())
      errors.name = "الاسم مطلوب";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ التعديل المطلوب هنا فقط
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const checkoutData: CheckoutRequest = {
      courseId,
      couponCode: coupon?.valid ? coupon.code : undefined,
    };

    try {
      const result = await submitCheckout(checkoutData);

      if (result.success) {
        onSuccess?.(result.transactionId);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const inputClass =
    "w-full bg-[#0a0a4a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none backdrop-blur-sm transition-all";

  if (transactionId) {
    return (
      <div className="bg-[#050530]/80 border border-amber-400/20 p-10 text-center rounded-3xl backdrop-blur-lg">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-white">تم تأمين مقعدك!</h2>
        <p className="text-white/60 mt-2">رقم الطلب: {transactionId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="bg-[#050530]/80 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          💳 بيانات الدفع - {courseName}
        </h2>

        {/* باقي الفورم بدون تغيير */}
        <div className="space-y-4">
          <div>
            <label className="text-white/50 text-sm ml-1 mb-1 block">
              رقم البطاقة
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className={inputClass}
            />
            {validationErrors.cardNumber && (
              <p className="text-red-400 text-xs mt-1">
                {validationErrors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-sm ml-1 mb-1 block">
                الانتهاء
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className={inputClass}
              />
              {validationErrors.expiry && (
                <p className="text-red-400 text-xs mt-1">
                  {validationErrors.expiry}
                </p>
              )}
            </div>

            <div>
              <label className="text-white/50 text-sm ml-1 mb-1 block">
                CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/\D/g, ""))
                }
                placeholder="***"
                className={inputClass}
              />
              {validationErrors.cvc && (
                <p className="text-red-400 text-xs mt-1">
                  {validationErrors.cvc}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-white/50 text-sm ml-1 mb-1 block">
              الاسم على البطاقة
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="الاسم كما يظهر"
              className={inputClass}
            />
            {validationErrors.name && (
              <p className="text-red-400 text-xs mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>
        </div>

        {/* كوبون */}
        <div className="mt-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="كود الخصم"
              className="flex-1 bg-[#0a0a4a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={() => applyCoupon(couponInput)}
              disabled={isApplyingCoupon}
              className="px-6 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition disabled:opacity-50"
            >
              {isApplyingCoupon ? "..." : "تطبيق"}
            </button>
          </div>

          {coupon?.valid && (
            <p className="text-green-400 text-sm mt-2">
              تم تطبيق الخصم: {coupon.discountPercent}%
            </p>
          )}

          {couponError && (
            <p className="text-red-400 text-sm mt-2">{couponError}</p>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center text-white">
          <span className="text-white/60">الإجمالي</span>
          <span className="text-2xl font-bold text-amber-400">
            {finalPrice.toFixed(2)} ريال
          </span>
        </div>

        {submitError && (
          <p className="text-red-400 text-sm mt-4 text-center">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-4 bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-50"
        >
          {isSubmitting ? "جاري المعالجة..." : "إتمام الدفع الآمن"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;