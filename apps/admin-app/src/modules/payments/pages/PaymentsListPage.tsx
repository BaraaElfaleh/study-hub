import { useAdminPayments } from '../hooks/useAdminPayments';
import { usePaymentsStore } from '../store/paymentsStore';
import DataTable from '../../../shared/components/ui/DataTable';
import FilterBar from '../../../shared/components/ui/FilterBar';
import Badge from '../../../shared/components/ui/Badge';

export default function PaymentsListPage() {
  const { payments, meta, isLoading } = useAdminPayments();
  const { filters, setCourseId, setStatus, setPage } = usePaymentsStore();

  const columns = [
    { header: 'المستخدم', accessor: 'userId' as const },
    { header: 'الكورس', accessor: 'courseId' as const },
    { header: 'المبلغ', accessor: (row: any) => `$${row.amount}` },
    {
      header: 'الحالة',
      accessor: (row: any) => {
        const m: any = {
          completed: { label: 'مكتمل', variant: 'success' as const },
          pending: { label: 'معلق', variant: 'warning' as const },
          failed: { label: 'فشل', variant: 'danger' as const },
        };
        const s = m[row.status] ?? { label: row.status, variant: 'warning' as const };
        return <Badge variant={s.variant}>{s.label}</Badge>;
      },
    },
    { header: 'التاريخ', accessor: (row: any) => new Date(row.createdAt).toLocaleDateString('ar-SA') },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">إدارة المدفوعات</h1>
      <FilterBar search={filters.courseId} onSearchChange={setCourseId}>
        <select
          value={filters.status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
        >
          <option value="">كل الحالات</option>
          <option value="completed">مكتمل</option>
          <option value="pending">معلق</option>
          <option value="failed">فشل</option>
        </select>
      </FilterBar>
      <DataTable
        columns={columns}
        data={payments}
        page={filters.page}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
        isLoading={isLoading}
        emptyMessage="لا توجد مدفوعات"
      />
    </div>
  );
}