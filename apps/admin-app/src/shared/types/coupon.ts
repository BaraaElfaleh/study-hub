export interface Coupon {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  currentUses?: number;
  description?: string;
  createdAt: string;
}
export interface CreateCouponRequest {
  title: string;
  code: string;
  discountPercentage: number;
  description?: string;
  maxUses?: number;
}
export interface UpdateCouponRequest extends Partial<CreateCouponRequest> {}
