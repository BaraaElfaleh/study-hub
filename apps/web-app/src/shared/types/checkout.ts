export interface CheckoutRequest {
  courseId: string;
  couponCode?: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  courseId: string;
  course?: {
    title: string;
  };
  userId: string;
  createdAt: string;
}