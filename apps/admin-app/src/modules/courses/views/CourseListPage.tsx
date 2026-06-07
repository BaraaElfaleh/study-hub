// apps/admin-app/src/modules/courses/views/CourseListPage.tsx
import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useCoursesStore } from '../store/coursesStore';
import { Table, Button, Input, Modal, Loader } from '../../../shared/components/ui';
import { formatCurrency } from '../../../shared/utils';
import CourseEditForm from './CourseEditForm';
import type { Course } from '../../../shared/types/course';
import { Pencil, Trash2, Plus } from 'lucide-react';

const CourseListPage = () => {
  const { courses, isLoading, error, deleteCourse, isDeleting } = useCourses();
  const { search, setSearch, levelFilter, setLevelFilter } = useCoursesStore();

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const columns = [
    { key: 'title', header: 'العنوان' },
    {
      key: 'instructorName',
      header: 'المدرس',
    },
    {
      key: 'level',
      header: 'المستوى',
      render: (c: Course) => (
        <span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
          {c.level === 'beginner' ? 'مبتدئ' : c.level === 'intermediate' ? 'متوسط' : 'متقدم'}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'السعر',
      render: (c: Course) => formatCurrency(c.price),
    },
    {
      key: 'isPublished',
      header: 'الحالة',
      render: (c: Course) => (
        <span className={c.isPublished ? 'text-green-400' : 'text-amber-400'}>
          {c.isPublished ? 'منشور' : 'مخفي'}
        </span>
      ),
    },
    {
      key: 'enrolledCount',
      header: 'الطلاب',
    },
    {
      key: 'actions',
      header: 'إجراءات',
      render: (c: Course) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setEditingCourse(c)} className="text-slate-400 hover:text-amber-400">
            <Pencil size={16} />
          </button>
          <button onClick={() => setDeletingId(c.id)} className="text-slate-400 hover:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل الكورسات</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">إدارة الكورسات</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="بحث عن كورس..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="all">جميع المستويات</option>
            <option value="beginner">مبتدئ</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">متقدم</option>
          </select>
          <Button onClick={() => setAddingNew(true)}>
            <Plus size={16} className="ml-1" />
            إضافة كورس
          </Button>
        </div>
      </div>

      <Table columns={columns} data={courses} />

      {/* مودال إضافة كورس جديد */}
      {addingNew && (
        <Modal isOpen={addingNew} onClose={() => setAddingNew(false)} title="إضافة كورس جديد">
          <CourseEditForm onClose={() => setAddingNew(false)} />
        </Modal>
      )}

      {/* مودال تعديل كورس */}
      {editingCourse && (
        <Modal isOpen={!!editingCourse} onClose={() => setEditingCourse(null)} title="تعديل الكورس">
          <CourseEditForm course={editingCourse} onClose={() => setEditingCourse(null)} />
        </Modal>
      )}

      {/* مودال حذف */}
      {deletingId && (
        <Modal isOpen={!!deletingId} onClose={() => setDeletingId(null)} title="تأكيد الحذف">
          <p className="text-slate-300 mb-6">هل أنت متأكد من حذف هذا الكورس؟ لا يمكن التراجع.</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setDeletingId(null)}>إلغاء</Button>
            <Button variant="danger" disabled={isDeleting} onClick={() => { deleteCourse(deletingId!); setDeletingId(null); }}>
              {isDeleting ? 'جاري الحذف...' : 'حذف'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseListPage;