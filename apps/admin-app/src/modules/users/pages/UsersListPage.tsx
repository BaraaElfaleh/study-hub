import { useState } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useUsersStore } from "../store/usersStore";
import DataTable from "../../../shared/components/ui/DataTable";
import FilterBar from "../../../shared/components/ui/FilterBar";
import Badge from "../../../shared/components/ui/Badge";
import ConfirmDialog from "../../../shared/components/ui/ConfirmDialog";

const ROLE_LABELS: Record<string, string> = {
  STUDENT: "طالب",
  TEACHER: "معلم",
  ADMIN: "مشرف",
};

export default function UsersListPage() {
  const { users, meta, isLoading, toggleActivation } = useAdminUsers();
  const { filters, setSearch, setRole, setIsActive, setPage } = useUsersStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const columns = [
    {
      header: "الاسم",
      accessor: (row: any) => `${row.firstName} ${row.lastName}`,
    },
    { header: "البريد الإلكتروني", accessor: "email" as const },
    {
      header: "الدور",
      accessor: (row: any) => ROLE_LABELS[row.role] ?? row.role,
    },
    {
      header: "الحالة",
      accessor: (row: any) => (
        <Badge variant={row.isActive ? "success" : "danger"}>
          {row.isActive ? "نشط" : "غير نشط"}
        </Badge>
      ),
    },
    {
      header: "إجراءات",
      accessor: (row: any) => (
        <button
          onClick={() => setSelectedUserId(row.id)}
          className="text-amber-400 hover:text-amber-300 text-sm"
        >
          {row.isActive ? "تعطيل" : "تفعيل"}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">إدارة المستخدمين</h1>
      <FilterBar search={filters.search} onSearchChange={setSearch}>
        <select
          value={filters.role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
        >
          <option value="">كل الأدوار</option>
          <option value="STUDENT">طالب</option>
          <option value="TEACHER">معلم</option>
          <option value="ADMIN">مشرف</option>
        </select>
        <select
          value={filters.isActive === undefined ? "" : String(filters.isActive)}
          onChange={(e) =>
            setIsActive(
              e.target.value === "" ? undefined : e.target.value === "true",
            )
          }
          className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
        >
          <option value="">كل الحالات</option>
          <option value="true">نشط</option>
          <option value="false">غير نشط</option>
        </select>
      </FilterBar>
      <DataTable
        columns={columns}
        data={users}
        page={filters.page}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
        isLoading={isLoading}
        emptyMessage="لا يوجد مستخدمين"
      />
      <ConfirmDialog
        open={!!selectedUserId}
        title="تغيير حالة المستخدم"
        message="هل أنت متأكد من تغيير حالة هذا المستخدم؟"
        onConfirm={() => {
          if (selectedUserId) toggleActivation(selectedUserId);
          setSelectedUserId(null);
        }}
        onCancel={() => setSelectedUserId(null)}
      />
    </div>
  );
}