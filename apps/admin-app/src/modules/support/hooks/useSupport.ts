// apps/admin-app/src/modules/support/hooks/useSupport.ts
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportApi, type TicketStatus } from '../api/supportApi';

export const useSupport = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('all');

  const ticketsQuery = useQuery({
    queryKey: ['admin', 'support', { statusFilter }],
    queryFn: () => supportApi.fetchTickets({ status: statusFilter }),
    staleTime: 30 * 1000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) =>
      supportApi.updateTicketStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'support'] }),
  });

  return {
    tickets: ticketsQuery.data ?? [],
    isLoading: ticketsQuery.isLoading,
    error: ticketsQuery.error,
    statusFilter,
    setStatusFilter,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};