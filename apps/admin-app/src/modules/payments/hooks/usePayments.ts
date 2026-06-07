// apps/admin-app/src/modules/payments/hooks/usePayments.ts
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsApi } from '../api/paymentsApi';
import type { PaymentStatus } from '../../../shared/types/payment';

export const usePayments = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('all');

  const paymentsQuery = useQuery({
    queryKey: ['admin', 'payments', { statusFilter }],
    queryFn: () => paymentsApi.fetchPayments({ status: statusFilter }),
    staleTime: 30 * 1000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: PaymentStatus }) =>
      paymentsApi.updatePaymentStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'payments'] }),
  });

  return {
    payments: paymentsQuery.data ?? [],
    isLoading: paymentsQuery.isLoading,
    error: paymentsQuery.error,
    statusFilter,
    setStatusFilter,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};