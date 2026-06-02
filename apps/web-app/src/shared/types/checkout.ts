export interface CheckoutRequest {
  courseId: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  couponCode?: string;
}

export interface CheckoutResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

export interface CouponValidationResponse {
  valid: boolean;
  code: string;
  discountPercent: number;
  message: string;
}