// features/auth/api/authService.ts
import httpClient from '../../shared/api/httpClient';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../shared/types/auth';

export const authService = {
  signIn: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  signUp: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  signOut: async (): Promise<void> => {
    await httpClient.post('/auth/logout');
  },

  fetchCurrentUser: async (): Promise<User> => {
    const { data } = await httpClient.get<User>('/auth/me');
    return data;
  },
};