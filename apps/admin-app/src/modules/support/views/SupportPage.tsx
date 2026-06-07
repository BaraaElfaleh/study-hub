// apps/admin-app/src/modules/support/views/SupportPage.tsx
import { useSupport } from '../hooks/useSupport';
import { Table, Loader } from '../../../shared/components/ui';
import { formatDate } from '../../../shared/utils';
import type { SupportTicket, TicketStatus } from '../api/supportApi';

const SupportPage = () => {
  const { tickets, isLoading, error, statusFilter, setStatusFilter, updateStatus, isUpdating } = useSupport();

  const columns = [
    { key: 'userName', header: 'المستخدم' },
    { key: 'subject', header: 'الموضوع' },
    {
      key: 'status',
      header: 'الحالة',
      render: (t: SupportTicket) => (
        <select
          value={t.status}
          onChange={(e) => updateStatus({ id: t.id, status: e.target.value as TicketStatus })}
          disabled={isUpdating}
          className={`px-2 py-1 rounded-full text-xs font-medium border border-transparent focus:outline-none ${
            t.status === 'open' ? 'bg-red-500/10 text-red-400' :
            t.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400' :
            'bg-green-500/10 text-green-400'
          }`}
        >
          <option value="open">مفتوحة</option>
          <option value="in_progress">قيد المعالجة</option>
          <option value="closed">مغلقة</option>
        </select>
      ),
    },
    {
      key: 'createdAt',
      header: 'تاريخ الإنشاء',
      render: (t: SupportTicket) => formatDate(t.createdAt),
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل التذاكر</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">الدعم الفني</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="all">جميع التذاكر</option>
          <option value="open">مفتوحة</option>
          <option value="in_progress">قيد المعالجة</option>
          <option value="closed">مغلقة</option>
        </select>
      </div>

      <Table columns={columns} data={tickets} />
    </div>
  );
};

export default SupportPage;