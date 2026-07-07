import client from "../../../shared/api/client";
import type { LoginRequest, LoginResponse } from "../../../shared/types/auth";
export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>("/auth/login", payload);
    return data;
  },
};
