// src/modules/profile/api/profileApi.ts
import client from '../../../shared/api/client';
import type { User } from '../../../shared/types/auth';

/**
 * استخراج بيانات المستخدم بشكل موحّد
 * يدعم الحالة التي يكون فيها الاسم داخل كائن `profile`
 */
const normalizeUser = (data: any): User => {
  // قد تكون البيانات محتوية على كائن profile بداخله firstName, lastName...
  const profile = data.profile || {};

  return {
    id: data.id ?? '',
    email: data.email ?? '',
    firstName: data.firstName ?? profile.firstName ?? '',
    lastName: data.lastName ?? profile.lastName ?? '',
    role: data.role ?? 'STUDENT',
    avatarUrl: data.avatarUrl ?? profile.avatarUrl ?? '',
    isActive: data.isActive ?? true,
    createdAt: data.createdAt ?? profile.createdAt ?? new Date().toISOString(),
  };
};

export const profileApi = {
  fetchProfile: async (): Promise<User> => {
    const { data } = await client.get('/users/me');
    console.log('📥 /users/me response:', data);
    return normalizeUser(data);
  },

  updateProfile: async (userId: string, payload: Partial<User>): Promise<User> => {
    // نرسل البيانات بنفس التنسيق الذي يتوقعه الباك (نضعه في profile إذا كان الباك يتطلب ذلك)
    // لكن بما أننا نرسل حالياً firstName, lastName مباشرة ونجح التحديث، نتركه كما هو.
    const body: Record<string, any> = {};
    if (payload.firstName !== undefined) body.firstName = payload.firstName;
    if (payload.lastName !== undefined) body.lastName = payload.lastName;
    if (payload.email !== undefined) body.email = payload.email;
    if (payload.avatarUrl !== undefined) body.avatarUrl = payload.avatarUrl;

    console.log(`📤 PATCH /users/${userId}/profile`, body);
    const { data } = await client.patch(`/users/${userId}/profile`, body);
    console.log('✅ update response:', data);
    return normalizeUser(data);
  },
};