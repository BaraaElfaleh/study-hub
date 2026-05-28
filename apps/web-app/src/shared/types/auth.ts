// src/shared/types/auth.ts
export type UserRole = 'student' | 'teacher' | 'admin'; // أضف admin إذا لزم

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;      // ← أضف هذا
  createdAt: string;    // ← أضف هذا
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string; // ← أضف هذا
}