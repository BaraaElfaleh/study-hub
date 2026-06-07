// apps/admin-app/src/modules/support/api/supportApi.ts
export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface SupportTicket {
  id: string;
  userName: string;
  email: string;
  subject: string;
  message: string;
  status: TicketStatus;
  createdAt: string;
}

const mockTickets: SupportTicket[] = [
  { id: 't1', userName: 'أحمد محمد', email: 'ahmed@example.com', subject: 'مشكلة في الدفع', message: 'حاولت الدفع لكن العملية فشلت.', status: 'open', createdAt: '2026-06-03T08:30:00Z' },
  { id: 't2', userName: 'سارة علي', email: 'sara@example.com', subject: 'استفسار عن الكورسات', message: 'متى يبدأ كورس Flutter؟', status: 'in_progress', createdAt: '2026-06-02T14:20:00Z' },
  { id: 't3', userName: 'مريم حسين', email: 'mariam@example.com', subject: 'مشكلة تقنية', message: 'لا أستطيع تحميل المحاضرة.', status: 'open', createdAt: '2026-06-01T10:00:00Z' },
  { id: 't4', userName: 'الأستاذ خالد', email: 'khaled@alnoon.com', subject: 'طلب إضافة كورس جديد', message: 'أريد إضافة كورس React Native.', status: 'closed', createdAt: '2026-05-28T09:00:00Z' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const supportApi = {
  fetchTickets: async (params?: { status?: string }): Promise<SupportTicket[]> => {
    await delay(500);
    let filtered = [...mockTickets];
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(t => t.status === params.status);
    }
    return filtered;
  },

  updateTicketStatus: async (ticketId: string, status: TicketStatus): Promise<SupportTicket> => {
    await delay(400);
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('التذكرة غير موجودة');
    ticket.status = status;
    return ticket;
  },
};