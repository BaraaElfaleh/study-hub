import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsApi } from '../api/couponsApi';
import type { UpdateCouponRequest } from '../../../shared/types/coupon';

export const useCoupons = () => {
  const queryClient = useQueryClient();
  const key = ['admin-coupons'];

  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: couponsApi.getCoupons,
  });

  const createMutation = useMutation({
    mutationFn: couponsApi.createCoupon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCouponRequest }) =>
      couponsApi.updateCoupon(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => couponsApi.deleteCoupon(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return {
    coupons: data ?? [],
    isLoading,
    error,
    createCoupon: createMutation.mutate,
    updateCoupon: updateMutation.mutate,
    deleteCoupon: deleteMutation.mutate,
  };
};