// apps/admin-app/src/modules/users/views/UserListPage.tsx
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useUsersStore } from '../store/usersStore';
import { Table, Button, Input, Modal, Loader } from '../../../shared/components/ui';
import { formatDate } from '../../../shared/utils';
import UserEditForm from './UserEditForm';
import type { User } from '../../../shared/types/user';
import { Pencil, Trash2 } from 'lucide-react';

const UserListPage = () => {
  const { users, isLoading, error, deleteUser, isDeleting } = useUsers();
  const { search, setSearch, roleFilter, setRoleFilter } = useUsersStore();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const columns = [
    { key: 'name', header: 'الاسم' },
    {
      key: 'role',
      header: 'الدور',
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'teacher' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          {user.role === 'teacher' ? 'معلم' : 'طالب'}
        </span>
      ),
    },
    { key: 'email', header: 'البريد الإلكتروني' },
    {
      key: 'isActive',
      header: 'الحالة',
      render: (user: User) => (
        <span className={user.isActive ? 'text-green-400' : 'text-red-400'}>
          {user.isActive ? 'نشط' : 'معطل'}
        </span>
      ),
    },
    {
      key: 'joinedAt',
      header: 'تاريخ التسجيل',
      render: (user: User) => formatDate(user.joinedAt),
    },
    {
      key: 'actions',
      header: 'إجراءات',
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setEditingUser(user)} className="text-slate-400 hover:text-amber-400">
            <Pencil size={16} />
          </button>
          <button onClick={() => setDeletingUserId(user.id)} className="text-slate-400 hover:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل المستخدمين</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">إدارة المستخدمين</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="بحث عن مستخدم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">جميع الأدوار</option>
            <option value="student">طالب</option>
            <option value="teacher">معلم</option>
            <option value="admin">مشرف</option>
          </select>
        </div>
      </div>

      <Table columns={columns} data={users} />

      {/* مودال تعديل المستخدم */}
      {editingUser && (
        <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title="تعديل المستخدم">
          <UserEditForm user={editingUser} onClose={() => setEditingUser(null)} />
        </Modal>
      )}

      {/* مودال تأكيد الحذف */}
      {deletingUserId && (
        <Modal isOpen={!!deletingUserId} onClose={() => setDeletingUserId(null)} title="تأكيد الحذف">
          <p className="text-slate-300 mb-6">هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setDeletingUserId(null)}>إلغاء</Button>
            <Button
              variant="danger"
              disabled={isDeleting}
              onClick={() => {
                deleteUser(deletingUserId!);
                setDeletingUserId(null);
              }}
            >
              {isDeleting ? 'جاري الحذف...' : 'حذف'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserListPage;