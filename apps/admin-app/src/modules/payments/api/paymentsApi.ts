// apps/admin-app/src/modules/payments/api/paymentsApi.ts
import type { Payment, PaymentStatus } from '../../../shared/types/payment';

const mockPayments: Payment[] = [
  { id: 'p1', userId: '1', userName: 'أحمد محمد', courseId: '1', courseName: 'تطوير الويب', amount: 149, status: 'completed', paidAt: '2026-06-01T10:30:00Z' },
  { id: 'p2', userId: '2', userName: 'سارة علي', courseId: '2', courseName: 'تصميم UI/UX', amount: 199, status: 'completed', paidAt: '2026-05-28T14:15:00Z' },
  { id: 'p3', userId: '4', userName: 'مريم حسين', courseId: '3', courseName: 'Flutter', amount: 179, status: 'pending', paidAt: '2026-06-02T09:00:00Z' },
  { id: 'p4', userId: '1', userName: 'أحمد محمد', courseId: '2', courseName: 'تصميم UI/UX', amount: 199, status: 'completed', couponCode: 'NOON20', paidAt: '2026-05-20T11:45:00Z' },
  { id: 'p5', userId: '5', userName: 'يوسف ناصر', courseId: '1', courseName: 'تطوير الويب', amount: 149, status: 'failed', paidAt: '2026-05-15T16:20:00Z' },
  { id: 'p6', userId: '2', userName: 'سارة علي', courseId: '3', courseName: 'Flutter', amount: 179, status: 'refunded', paidAt: '2026-04-10T08:00:00Z' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const paymentsApi = {
  fetchPayments: async (params?: { status?: string }): Promise<Payment[]> => {
    await delay(600);
    let filtered = [...mockPayments];
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(p => p.status === params.status);
    }
    return filtered;
  },

  updatePaymentStatus: async (paymentId: string, status: PaymentStatus): Promise<Payment> => {
    await delay(400);
    const payment = mockPayments.find(p => p.id === paymentId);
    if (!payment) throw new Error('الدفعة غير موجودة');
    payment.status = status;
    return payment;
  },
};