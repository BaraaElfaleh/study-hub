// apps/admin-app/src/modules/users/views/UserEditForm.tsx
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { Button, Input } from '../../../shared/components/ui';
import type { User } from '../../../shared/types/user';

interface UserEditFormProps {
  user: User;
  onClose: () => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);

  const { updateUser, isUpdating } = useUsers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(
      { id: user.id, data: { name, email, role, isActive } },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="الاسم" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="البريد الإلكتروني" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">الدور</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="student">طالب</option>
          <option value="teacher">معلم</option>
          <option value="admin">مشرف</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
        />
        <label className="text-slate-300 text-sm">الحساب نشط</label>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onClose}>إلغاء</Button>
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </form>
  );
};

export default UserEditForm;