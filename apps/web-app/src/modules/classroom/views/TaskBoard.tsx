import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useTasks } from '../../../modules/classroom/hooks/useTasks';
import { Loader } from '../../../shared/components/ui/Loader';
import { ListChecks, Plus, Trash2, Edit3, Save } from 'lucide-react';
import { useAuthStore } from '../../../modules/auth/store/authStore';
import type { Task, TaskStatusEnum } from '../../../modules/classroom/dtos/classroomDto';

const TaskBoard = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/tasks',
  }) as { classroomId: string };

  const {
    tasks,
    isLoading,
    error,
    updateTaskStatus,
    isUpdatingStatus,
    addTask,
    isAdding,
    deleteTask,
    isDeleting,
    updateTask,
    isUpdatingTask,
  } = useTasks(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'teacher';

  // حالة نموذج الإضافة
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // حالة التعديل لمهمة محددة
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const handleStatusChange = (taskId: string, status: string) => {
    updateTaskStatus({ taskId, status: status as TaskStatusEnum });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newDescription.trim() && newDueDate) {
      addTask({ title: newTitle.trim(), description: newDescription.trim(), due_date: newDueDate });
      setNewTitle('');
      setNewDescription('');
      setNewDueDate('');
      setShowAddForm(false);
    }
  };

  const handleEditStart = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate); // افترض أن dueDate بتنسيق مناسب، يمكن تحويله
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  const handleEditSave = () => {
    if (editingTaskId && editTitle.trim() && editDescription.trim() && editDueDate) {
      updateTask({
        taskId: editingTaskId,
        updates: {
          title: editTitle.trim(),
          description: editDescription.trim(),
          dueDate: editDueDate,
          // يمكن أيضاً تعديل الحالة ولكن نتركها كما هي
        },
      });
      setEditingTaskId(null);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل المهام</p>;

  return (
    <div className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 rounded-2xl relative overflow-hidden" dir="rtl">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <ListChecks size={24} className="text-amber-400" />
            المهام
          </h3>
          {isTeacher && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
            >
              <Plus size={18} />
              إضافة مهمة
            </button>
          )}
        </div>

        {/* نموذج إضافة مهمة */}
        {showAddForm && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <input
              type="text"
              placeholder="عنوان المهمة"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all"
              required
            />
            <textarea
              placeholder="وصف المهمة"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all min-h-25"
              required
            />
            <input
              type="datetime-local"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all"
              required
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">إلغاء</button>
              <button onClick={handleAddSubmit} disabled={isAdding} className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-6 py-2 rounded-xl transition-all disabled:opacity-50">
                {isAdding ? 'جاري الإضافة...' : 'إضافة'}
              </button>
            </div>
          </div>
        )}

        {/* قائمة المهام */}
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20"
          >
            {editingTaskId === task.id ? (
              // وضع التعديل
              <div className="space-y-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50 min-h-20"
                />
                <input
                  type="datetime-local"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={handleEditCancel} className="px-4 py-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">إلغاء</button>
                  <button onClick={handleEditSave} disabled={isUpdatingTask} className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-6 py-2 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2">
                    <Save size={16} />
                    {isUpdatingTask ? 'جاري الحفظ...' : 'حفظ'}
                  </button>
                </div>
              </div>
            ) : (
              // عرض المهمة العادي
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">{task.title}</h3>
                  <div className="flex items-center gap-2">
                    {/* أيقونة تعديل للمعلم فقط */}
                    {isTeacher && (
                      <button
                        onClick={() => handleEditStart(task)}
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                        title="تعديل المهمة"
                      >
                        <Edit3 size={18} />
                      </button>
                    )}
                    {/* أيقونة حذف للمعلم فقط */}
                    {isTeacher && (
                      <button
                        onClick={() => deleteTask(task.id)}
                        disabled={isDeleting}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="حذف المهمة"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-white/60 mt-2 text-sm">{task.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {/* أزرار تغيير الحالة (بدلاً من select) */}
                    <button
                      onClick={() => handleStatusChange(task.id, 'pending')}
                      disabled={isUpdatingStatus}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        task.status === 'pending'
                          ? 'bg-white/10 text-white'
                          : 'bg-transparent text-white/40 hover:text-white'
                      }`}
                    >
                      معلق
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'in_progress')}
                      disabled={isUpdatingStatus}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        task.status === 'in_progress'
                          ? 'bg-amber-400/10 text-amber-400'
                          : 'bg-transparent text-white/40 hover:text-white'
                      }`}
                    >
                      قيد التنفيذ
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'done')}
                      disabled={isUpdatingStatus}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        task.status === 'done'
                          ? 'bg-green-400/20 text-green-400'
                          : 'bg-transparent text-white/40 hover:text-white'
                      }`}
                    >
                      مكتمل
                    </button>
                  </div>
                  {/* تاريخ الاستحقاق */}
                  <span className="text-white/40 text-xs">{task.dueDate}</span>
                </div>
              </>
            )}
          </div>
        ))}
        {tasks?.length === 0 && !showAddForm && (
          <p className="text-white/60 text-center py-10">لا توجد مهام بعد</p>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;