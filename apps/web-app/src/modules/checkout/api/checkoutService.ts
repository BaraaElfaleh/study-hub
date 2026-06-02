import type { CouponResponse, CheckoutRequest, CheckoutResponse } from "../dtos/checkoutDto";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function validateCoupon(code: string): Promise<CouponResponse> {
  const res = await fetch(`${BASE_URL}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) throw new Error("فشل التحقق من الكوبون");
  return res.json();
}

export async function processCheckout(data: CheckoutRequest): Promise<CheckoutResponse> {
  const res = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "فشل إتمام الدفع");
  }
  return res.json();
}