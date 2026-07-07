import client from '../../../shared/api/client';
import type { PaginatedResponse } from '../../../shared/types/api';
import type { User } from '../../../shared/types/user';

export const usersApi = {
  getUsers: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<User>> => {
    // حذف أي مفتاح قيمته فارغة أو undefined
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== '' && v !== undefined
      )
    );
    const { data } = await client.get('/admin/users', { params: cleanParams });
    return data;
  },
  toggleActivation: async (id: string) => {
    await client.patch(`/admin/users/${id}/activation`);
  },
};