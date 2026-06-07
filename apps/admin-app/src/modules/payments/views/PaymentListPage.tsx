// apps/admin-app/src/modules/payments/views/PaymentListPage.tsx
import { usePayments } from '../hooks/usePayments';
import { Table, Loader } from '../../../shared/components/ui';
import { formatDate, formatCurrency } from '../../../shared/utils';
import type { Payment } from '../../../shared/types/payment';

const PaymentListPage = () => {
  const { payments, isLoading, error, statusFilter, setStatusFilter, updateStatus, isUpdating } = usePayments();

  const columns = [
    { key: 'userName', header: 'الطالب' },
    { key: 'courseName', header: 'الكورس' },
    {
      key: 'amount',
      header: 'المبلغ',
      render: (p: Payment) => formatCurrency(p.amount),
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (p: Payment) => (
        <select
          value={p.status}
          onChange={(e) => updateStatus({ id: p.id, status: e.target.value as Payment['status'] })}
          disabled={isUpdating}
          className={`px-2 py-1 rounded-full text-xs font-medium border border-transparent focus:outline-none ${
            p.status === 'completed' ? 'bg-green-500/10 text-green-400' :
            p.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
            p.status === 'failed' ? 'bg-red-500/10 text-red-400' :
            'bg-slate-500/10 text-slate-400'
          }`}
        >
          <option value="pending">معلق</option>
          <option value="completed">مكتمل</option>
          <option value="failed">فشل</option>
          <option value="refunded">مسترجع</option>
        </select>
      ),
    },
    {
      key: 'paidAt',
      header: 'تاريخ الدفع',
      render: (p: Payment) => formatDate(p.paidAt),
    },
    {
      key: 'couponCode',
      header: 'كوبون',
      render: (p: Payment) => p.couponCode || '-',
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل المدفوعات</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">المدفوعات</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="all">جميع الحالات</option>
          <option value="completed">مكتمل</option>
          <option value="pending">معلق</option>
          <option value="failed">فشل</option>
          <option value="refunded">مسترجع</option>
        </select>
      </div>

      <Table columns={columns} data={payments} />
    </div>
  );
};

export default PaymentListPage;