import type { UserRole } from "../../../shared/types/user";

export interface ProfileDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
}

export interface UpdateProfileDTO {
  name?: string;
  email?: string;
  avatar?: string;
  currentPassword?: string;
  newPassword?: string;
}