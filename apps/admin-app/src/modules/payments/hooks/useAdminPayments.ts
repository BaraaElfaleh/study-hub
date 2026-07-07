import { useQuery } from '@tanstack/react-query';
import { paymentsApi } from '../api/paymentsApi';
import { usePaymentsStore } from '../store/paymentsStore';

export const useAdminPayments = () => {
  const filters = usePaymentsStore((s) => s.filters);

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-payments', filters],
    queryFn: () => paymentsApi.getPayments(filters),
  });

  return {
    payments: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
  };
};