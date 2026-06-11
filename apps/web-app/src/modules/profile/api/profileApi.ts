import client from '../../../shared/api/client';
import type { User } from '../../../shared/types/auth';

export const profileApi = {
  fetchProfile: async (): Promise<User> => {
    const { data } = await client.get<User>('/users/me');
    return data;
  },
  updateProfile: async (userId: string, payload: Partial<User>): Promise<User> => {
    const { data } = await client.patch<User>(`/users/${userId}/profile`, payload);
    return data;
  },
};