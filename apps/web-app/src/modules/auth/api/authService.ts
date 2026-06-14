// src/modules/auth/api/authService.ts
import client from '../../../shared/api/client';
import type { LoginRequest, RegisterRequest, LoginResponse, User } from '../../../shared/types/auth';

export const authService = {
  signIn: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  signUp: async (payload: RegisterRequest): Promise<void> => {
    await client.post('/auth/register', payload);
  },

  fetchCurrentUser: async (): Promise<User> => {
    const { data } = await client.get<User>('/users/me');
    return data;
  },
};