//modules/profile/api/profileApi.ts
import type { ProfileDTO, UpdateProfileDTO } from '../dtos/profileDto';
import { mockUser } from '../../../mock/data';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const profileApi = {
  fetchProfile: async (): Promise<ProfileDTO> => {
    await delay(400);
    // تحويل mockUser إلى ProfileDTO
    return {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      avatar: mockUser.avatar,
      created_at: mockUser.createdAt,
    };
  },

  updateProfile: async (data: UpdateProfileDTO): Promise<ProfileDTO> => {
    await delay(800);
    // تحديث البيانات محلياً في mock (اختياري)
    mockUser.name = data.name || mockUser.name;
    mockUser.email = data.email || mockUser.email;
    if (data.avatar) mockUser.avatar = data.avatar;
    return {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      avatar: mockUser.avatar,
      created_at: mockUser.createdAt,
    };
  },
};