// src/modules/checkout/hooks/useCheckout.ts
import { useState, useCallback } from "react";
import type { CheckoutRequest } from "../../../shared/types/checkout";

// محاكاة قاعدة بيانات كوبونات
const validCoupons: Record<string, number> = {
  NOON20: 20,
  LEARN50: 50,
  BOHO2026: 10,
};

interface CheckoutResponse {
  success: boolean;
  transactionId: string;
  message: string;
}
/**
 * هوك مخصص لإدارة عملية الدفع وتطبيق الكوبونات.
 * @param coursePrice - سعر الدورة المطلوب دفعها.
 */
export const useCheckout = (coursePrice: number) => {
  const [coupon, setCoupon] = useState<{
    valid: boolean;
    code: string;
    discountPercent: number;
  } | null>(null);

  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const finalPrice = coupon?.valid
    ? coursePrice - (coursePrice * discountPercent) / 100
    : coursePrice;

  const applyCoupon = useCallback(async (code: string) => {
    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      await new Promise((r) => setTimeout(r, 600));

      const percent = validCoupons[code.toUpperCase()];

      if (percent) {
        setCoupon({
          valid: true,
          code: code.toUpperCase(),
          discountPercent: percent,
        });
        setDiscountPercent(percent);
      } else {
        setCoupon(null);
        setDiscountPercent(0);
        setCouponError("الكوبون غير صالح أو منتهي الصلاحية");
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  }, []);

  const clearCoupon = useCallback(() => {
    setCoupon(null);
    setDiscountPercent(0);
  }, []);

  const submitCheckout = useCallback(
    async (data: CheckoutRequest): Promise<CheckoutResponse> => {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        console.log("Sending checkout data:", data);

        await new Promise((r) => setTimeout(r, 1500));

        const response: CheckoutResponse = {
          success: true,
          transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
          message: "تم الدفع بنجاح",
        };

        setTransactionId(response.transactionId);

        return response;
      } catch (err) {
        setSubmitError("حدث خطأ أثناء الدفع. حاول مرة أخرى.");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    coupon,
    couponError,
    isApplyingCoupon,
    applyCoupon,
    clearCoupon,
    discountPercent,
    finalPrice,
    isSubmitting,
    submitError,
    transactionId,
    submitCheckout,
  };
};