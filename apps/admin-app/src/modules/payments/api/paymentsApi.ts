import client from '../../../shared/api/client';
import type { PaginatedResponse } from '../../../shared/types/api';
import type { Payment } from '../../../shared/types/payment';

export const paymentsApi = {
  getPayments: async (params: {
    page?: number;
    limit?: number;
    courseId?: string;
    status?: string;
  }): Promise<PaginatedResponse<Payment>> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== '' && v !== undefined
      )
    );
    const { data } = await client.get('/admin/payments', { params: cleanParams });
    return data;
  },
};