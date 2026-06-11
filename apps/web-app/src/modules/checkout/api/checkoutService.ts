import client from '../../../shared/api/client';
import type { CheckoutRequest } from '../../../shared/types/checkout';

export const checkoutApi = {
  createCheckout: async (payload: CheckoutRequest): Promise<unknown> => {
    const { data } = await client.post('/payments/checkout', payload);
    return data;
  },
};