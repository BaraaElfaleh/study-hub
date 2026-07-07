import client from "../../../shared/api/client";
import type { PaginatedResponse } from "../../../shared/types/api";
import type { Payment } from "../../../shared/types/payment";

export const paymentsApi = {
  getPayments: async (params: {
    page?: number;
    limit?: number;
    courseId?: string;
    status?: string;
  }): Promise<PaginatedResponse<Payment>> => {
    const { data } = await client.get("/admin/payments", { params });
    return data;
  },
};
