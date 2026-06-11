// apps/admin-app/src/shared/types/admin.ts
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeStudents: number;
  recentEnrollments: any[];
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
}

export interface AdminCourse {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  teacherId: string;
  teacher?: {
    firstName: string;
    lastName: string;
  };
  _count?: {
    enrollments: number;
    lectures: number;
    assignments: number;
  };
  createdAt: string;
}

export interface Coupon {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  description?: string;
  maxUses: number;
  usedCount: number;
  assignedUserIds: string[];
  createdAt: string;
}

export interface CreateCouponRequest {
  title: string;
  code: string;
  discountPercentage: number;
  description?: string;
  maxUses?: number;
  assignedUserIds?: string[];
}

export interface UpdateCouponRequest {
  title?: string;
  code?: string;
  discountPercentage?: number;
  description?: string;
  maxUses?: number;
  assignedUserIds?: string[];
}

export interface AdminPayment {
  id: string;
  amount: number;
  status: string;
  userId: string;
  courseId: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  course?: {
    title: string;
  };
  createdAt: string;
}

export interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
}