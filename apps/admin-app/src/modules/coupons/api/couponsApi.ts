import client from "../../../shared/api/client";
import type {
  Coupon,
  CreateCouponRequest,
  UpdateCouponRequest,
} from "../../../shared/types/coupon";
export const couponsApi = {
  getCoupons: async (): Promise<Coupon[]> => {
    const { data } = await client.get<Coupon[]>("/admin/coupons");
    return data;
  },
  createCoupon: async (p: CreateCouponRequest): Promise<Coupon> => {
    const { data } = await client.post<Coupon>("/admin/coupons", p);
    return data;
  },
  updateCoupon: async (id: string, p: UpdateCouponRequest): Promise<Coupon> => {
    const { data } = await client.patch<Coupon>(`/admin/coupons/${id}`, p);
    return data;
  },
  deleteCoupon: async (id: string): Promise<void> => {
    await client.delete(`/admin/coupons/${id}`);
  },
};
