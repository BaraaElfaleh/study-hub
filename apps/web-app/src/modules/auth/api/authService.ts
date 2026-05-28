// features/auth/api/authService.ts
import client from '../../../shared/api/client';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../../shared/types/auth';

export const authService = {
  signIn: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await client.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  signUp: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await client.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  signOut: async (): Promise<void> => {
    await client.post('/auth/logout');
  },

  fetchCurrentUser: async (): Promise<User> => {
    const { data } = await client.get<User>('/auth/me');
    return data;
  },
};