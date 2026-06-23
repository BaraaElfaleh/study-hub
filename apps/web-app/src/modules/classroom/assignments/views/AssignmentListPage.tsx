// src/modules/classroom/assignments/pages/AssignmentListPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useAssignments } from '../hooks/useAssignments';
import { useSubmissions } from '../hooks/useSubmissions';
import { useAuthStore } from '../../../auth/store/authStore';
import {
  CheckSquare,
  Plus,
  Edit3,
  Trash2,
  Save,
  Upload,
  FileText,
  Loader,
} from 'lucide-react';

const AssignmentListPage = () => {
  const { classroomId } = useParams({
    from: '/_protected/_tsx/classroom/$classroomId/assignments/',
  }) as { classroomId: string };

  const {
    assignments,
    isLoading,
    error,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAssignments(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  // حالة النموذج
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');

  // حالة التعديل
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    createAssignment({ title: formTitle.trim(), description: formDesc.trim() });
    setFormTitle('');
    setFormDesc('');
    setShowForm(false);
  };

  const startEdit = (a: any) => {
    setEditingId(a.id);
    setEditTitle(a.title);
    setEditDesc(a.description || '');
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateAssignment({ id: editingId, data: { title: editTitle, description: editDesc } });
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      {/* الرأس */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CheckSquare size={24} className="text-amber-400" />
          الواجبات
        </h2>
        {isTeacher && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
          >
            <Plus size={18} />
            إضافة واجب
          </button>
        )}
      </div>

      {/* نموذج الإضافة */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="عنوان الواجب"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
            required
          />
          <textarea
            placeholder="وصف الواجب"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            rows={3}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-6 py-2 rounded-xl font-medium disabled:opacity-50"
            >
              {isCreating ? 'جاري الإنشاء...' : 'إنشاء'}
            </button>
          </div>
        </form>
      )}

      {/* حالات التحميل والخطأ */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin h-6 w-6 text-amber-400" />
        </div>
      )}
      {error && <p className="text-red-400 text-center">فشل تحميل الواجبات</p>}

      {/* قائمة الواجبات */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {assignments.length === 0 && (
            <p className="text-white/60 text-center py-10">لا توجد واجبات بعد</p>
          )}
          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
            >
              {editingId === a.id ? (
                /* وضع التعديل */
                <div className="space-y-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-white/60 hover:bg-white/10 rounded-lg"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={saveEdit}
                      disabled={isUpdating}
                      className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-4 py-1 rounded-lg flex items-center gap-1 disabled:opacity-50"
                    >
                      <Save size={16} /> حفظ
                    </button>
                  </div>
                </div>
              ) : (
                /* وضع العرض */
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg">{a.title}</h3>
                    {isTeacher && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(a)}
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                          title="تعديل"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteAssignment(a.id)}
                          disabled={isDeleting}
                          className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                  {a.description && (
                    <p className="text-white/60 text-sm mt-2">{a.description}</p>
                  )}
                  {/* مكون التسليم للطالب */}
                  {!isTeacher && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <SubmissionSection courseId={classroomId} assignmentId={a.id} />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* مكوّن صغير للتسليم */
const SubmissionSection = ({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) => {
  const { mySubmission, submit, isSubmitting } = useSubmissions(courseId, assignmentId);
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileUrl.trim()) {
      submit({ fileUrl: fileUrl.trim() });
      setFileUrl('');
    }
  };

  if (mySubmission) {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 rounded-xl px-4 py-2">
        <FileText size={16} />
        <span>تم التسليم بنجاح</span>
        <a
          href={mySubmission.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline"
        >
          عرض الملف
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="url"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
        placeholder="رابط ملف التسليم"
        className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-4 py-2 rounded-xl flex items-center gap-1 disabled:opacity-50"
      >
        <Upload size={16} />
        {isSubmitting ? 'جارٍ...' : 'تسليم'}
      </button>
    </form>
  );
};

export default AssignmentListPage;