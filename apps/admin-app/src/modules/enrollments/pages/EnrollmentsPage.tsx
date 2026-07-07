import { useState } from "react";
import { useAdminEnrollments } from "../hooks/useAdminEnrollments";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
import { useAdminCourses } from "../../../modules/courses/hooks/useAdminCourses";
import DataTable from "../../../shared/components/ui/DataTable";
import ConfirmDialog from "../../../shared/components/ui/ConfirmDialog";
import { Plus, UserMinus, BarChart3 } from "lucide-react";

export default function EnrollmentsPage() {
  const {
    enrollments,
    isLoading,
    enrollStudent,
    unenrollStudent,
    updateProgress,
  } = useAdminEnrollments();

  const { selectedCourseId, setSelectedCourseId } = useEnrollmentsStore();
  const { courses } = useAdminCourses();
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [newStudentId, setNewStudentId] = useState("");
  const [studentToRemove, setStudentToRemove] = useState<string | null>(null);
  const [editingProgress, setEditingProgress] = useState<{
    id: string;
    progress: number;
  } | null>(null);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentId.trim()) return;
    enrollStudent({
      courseId: selectedCourseId,
      studentId: newStudentId.trim(),
    });
    setNewStudentId("");
    setShowEnrollModal(false);
  };

  const columns = [
    {
      header: "الطالب",
      accessor: (row: any) =>
        row.student
          ? `${row.student.firstName} ${row.student.lastName}`
          : row.studentId,
    },
    {
      header: "التقدم",
      accessor: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-white/10 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full"
              style={{ width: `${row.progress}%` }}
            />
          </div>
          <span className="text-white text-sm">{row.progress}%</span>
          <button
            onClick={() =>
              setEditingProgress({ id: row.id, progress: row.progress })
            }
            className="text-blue-400 hover:text-blue-300"
          >
            <BarChart3 size={16} />
          </button>
        </div>
      ),
    },
    {
      header: "إجراءات",
      accessor: (row: any) => (
        <button
          onClick={() => setStudentToRemove(row.studentId)}
          className="text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <UserMinus size={16} /> إلغاء
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">إدارة التسجيلات</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <label className="block text-white/80 text-sm mb-3">
          اختر الكورس لعرض التسجيلات
        </label>
        <div className="flex gap-4">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
          >
            <option value="">-- اختر كورس --</option>
            {courses.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          {selectedCourseId && (
            <button
              onClick={() => setShowEnrollModal(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl"
            >
              <Plus size={18} /> تسجيل طالب
            </button>
          )}
        </div>
      </div>

      {selectedCourseId ? (
        <DataTable
          columns={columns}
          data={enrollments}
          page={1}
          totalPages={1}
          onPageChange={() => {}}
          isLoading={isLoading}
          emptyMessage="لا يوجد طلاب مسجلين"
        />
      ) : (
        <div className="text-white/60 text-center py-10">
          الرجاء اختيار كورس لعرض التسجيلات
        </div>
      )}

      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0a0a3c] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-4">
              تسجيل طالب جديد
            </h3>
            <form onSubmit={handleEnrollSubmit}>
              <input
                type="text"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                placeholder="معرف الطالب (ID)"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#050530] rounded-xl font-medium"
                >
                  تسجيل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#0a0a3c] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-4">تحديث التقدم</h3>
            <input
              type="number"
              value={editingProgress.progress}
              onChange={(e) =>
                setEditingProgress({
                  ...editingProgress,
                  progress: Number(e.target.value),
                })
              }
              min={0}
              max={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingProgress(null)}
                className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  updateProgress({
                    enrollmentId: editingProgress.id,
                    progress: editingProgress.progress,
                  });
                  setEditingProgress(null);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#050530] rounded-xl font-medium"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!studentToRemove}
        title="إلغاء تسجيل الطالب"
        message="هل أنت متأكد من إلغاء تسجيل هذا الطالب من الكورس؟"
        onConfirm={() => {
          if (studentToRemove)
            unenrollStudent({
              courseId: selectedCourseId,
              studentId: studentToRemove,
            });
          setStudentToRemove(null);
        }}
        onCancel={() => setStudentToRemove(null)}
      />
    </div>
  );
}
