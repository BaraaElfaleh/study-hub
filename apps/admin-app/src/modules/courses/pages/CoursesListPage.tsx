import { useState } from 'react';
import { useAdminCourses } from '../hooks/useAdminCourses';
import { useCoursesStore } from '../store/coursesStore';
import DataTable from '../../../shared/components/ui/DataTable';
import FilterBar from '../../../shared/components/ui/FilterBar';
import Badge from '../../../shared/components/ui/Badge';
import ConfirmDialog from '../../../shared/components/ui/ConfirmDialog';

export default function CoursesListPage() {
  const { courses, meta, isLoading, toggleActivation, assignTeacher } = useAdminCourses();
  const { filters, setSearch, setPage } = useCoursesStore();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showAssignTeacher, setShowAssignTeacher] = useState(false);
  const [teacherId, setTeacherId] = useState('');

  const columns = [
    { header: 'العنوان', accessor: 'title' as const },
    {
      header: 'المعلم',
      accessor: (row: any) =>
        row.teacher
          ? `${row.teacher.firstName} ${row.teacher.lastName}`
          : 'غير معين',
    },
    {
      header: 'الحالة',
      accessor: (row: any) => (
        <Badge variant={row.isActive ? 'success' : 'danger'}>
          {row.isActive ? 'نشط' : 'غير نشط'}
        </Badge>
      ),
    },
    {
      header: 'إجراءات',
      accessor: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCourseId(row.id)}
            className="text-amber-400 hover:text-amber-300 text-sm"
          >
            {row.isActive ? 'تعطيل' : 'تفعيل'}
          </button>
          <button
            onClick={() => {
              setSelectedCourseId(row.id);
              setShowAssignTeacher(true);
            }}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            تعيين معلم
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">إدارة الكورسات</h1>
      <FilterBar search={filters.search} onSearchChange={setSearch} />
      <DataTable
        columns={columns}
        data={courses}
        page={filters.page}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={setPage}
        isLoading={isLoading}
        emptyMessage="لا توجد كورسات"
      />
      <ConfirmDialog
        open={!!selectedCourseId && !showAssignTeacher}
        title="تغيير حالة الكورس"
        message="هل أنت متأكد من تغيير حالة هذا الكورس؟"
        onConfirm={() => {
          if (selectedCourseId) toggleActivation(selectedCourseId);
          setSelectedCourseId(null);
        }}
        onCancel={() => setSelectedCourseId(null)}
      />
      {showAssignTeacher && selectedCourseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0a0a3c] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold text-lg mb-4">تعيين معلم للكورس</h3>
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              placeholder="معرف المعلم (ID)"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAssignTeacher(false);
                  setSelectedCourseId(null);
                  setTeacherId('');
                }}
                className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  if (teacherId.trim()) assignTeacher({ courseId: selectedCourseId, teacherId: teacherId.trim() });
                  setShowAssignTeacher(false);
                  setSelectedCourseId(null);
                  setTeacherId('');
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#050530] rounded-xl font-medium"
              >
                تعيين
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}