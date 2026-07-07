import { useState } from 'react';
import { useCoupons } from '../hooks/useCoupons';
import { useCouponsStore } from '../store/couponsStore';
import DataTable from '../../../shared/components/ui/DataTable';
import ConfirmDialog from '../../../shared/components/ui/ConfirmDialog';
import Badge from '../../../shared/components/ui/Badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CouponForm from './CouponForm';

export default function CouponsListPage() {
  const { coupons, isLoading, deleteCoupon } = useCoupons();
  const { openForm } = useCouponsStore();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const columns = [
    { header: 'العنوان', accessor: 'title' as const },
    { header: 'الكود', accessor: 'code' as const },
    { header: 'الخصم', accessor: (row: any) => `${row.discountPercentage}%` },
    {
      header: 'الحالة',
      accessor: (row: any) => (
        <Badge variant={row.maxUses === 0 || (row.currentUses ?? 0) < row.maxUses ? 'success' : 'danger'}>
          {row.maxUses === 0 || (row.currentUses ?? 0) < row.maxUses ? 'فعال' : 'منتهي'}
        </Badge>
      ),
    },
    {
      header: 'إجراءات',
      accessor: (row: any) => (
        <div className="flex gap-2">
          <button onClick={() => openForm(row)} className="text-amber-400 hover:text-amber-300">
            <Pencil size={16} />
          </button>
          <button onClick={() => setDeleteTargetId(row.id)} className="text-red-400 hover:text-red-300">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">إدارة الكوبونات</h1>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl"
        >
          <Plus size={18} /> كوبون جديد
        </button>
      </div>
      <DataTable
        columns={columns}
        data={coupons}
        page={1}
        totalPages={1}
        onPageChange={() => {}}
        isLoading={isLoading}
        emptyMessage="لا توجد كوبونات"
      />
      <ConfirmDialog
        open={!!deleteTargetId}
        title="حذف كوبون"
        message="هل أنت متأكد من حذف هذا الكوبون؟"
        onConfirm={() => {
          if (deleteTargetId) deleteCoupon(deleteTargetId);
          setDeleteTargetId(null);
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
      <CouponForm />
    </div>
  );
}