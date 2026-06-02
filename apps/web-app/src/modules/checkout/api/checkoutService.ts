import client from '../../../shared/api/client';
import type {
  CouponValidationResponse,
  CheckoutRequest,
  CheckoutResponse,
} from '../../../shared/types/checkout';

export async function validateCoupon(code: string): Promise<CouponValidationResponse> {
  const { data } = await client.post<CouponValidationResponse>('/coupons/validate', { code });
  return data;
}

export async function processCheckout(payload: CheckoutRequest): Promise<CheckoutResponse> {
  const { data } = await client.post<CheckoutResponse>('/checkout', payload);
  return data;
}