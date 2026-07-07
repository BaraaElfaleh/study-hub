import client from "../../../shared/api/client";
import type { PaginatedResponse } from "../../../shared/types/api";
import type { User } from "../../../shared/types/user";
export const usersApi = {
  getUsers: async (params: any): Promise<PaginatedResponse<User>> => {
    const { data } = await client.get("/admin/users", { params });
    return data;
  },
  toggleActivation: async (id: string) => {
    await client.patch(`/admin/users/${id}/activation`);
  },
};
