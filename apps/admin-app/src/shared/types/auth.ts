export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { accessToken: string; refreshToken: string; user: AdminUser; }
export interface AdminUser { id: string; email: string; firstName: string; lastName: string; role: 'ADMIN'; }