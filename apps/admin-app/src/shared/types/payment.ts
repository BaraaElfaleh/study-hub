// apps/admin-app/src/shared/types/payment.ts
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  amount: number;
  status: PaymentStatus;
  couponCode?: string;
  transactionId?: string;
  paidAt: string;
}