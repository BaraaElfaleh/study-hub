import { useParams } from '@tanstack/react-router';
import { useTasks } from '../hooks/useTasks';
import { ListChecks } from 'lucide-react';
import type { TaskStatusEnum } from '../dtos/classroomDto';

const TaskBoard = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/tasks',
  }) as { classroomId: string };

  const { tasks, isLoading, error, updateTaskStatus, isUpdating } = useTasks(classroomId);

  if (isLoading) return <p className="text-white/60">تحميل المهام...</p>;
  if (error) return <p className="text-red-400">فشل تحميل المهام</p>;

  const handleStatusChange = (taskId: string, status: string) => {
    updateTaskStatus({
      taskId,
      status: status as TaskStatusEnum,
    });
  };

  return (
    <div
      className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 rounded-2xl relative overflow-hidden"
      dir="rtl"
    >
      {/* تأثيرات خلفية (نقاط مضيئة وتوهج) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* عنوان */}
        <h3 className="text-2xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
          <ListChecks size={24} className="text-amber-400" />
          المهام
        </h3>

        {tasks?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-white/60">لا توجد مهام حالياً.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20"
              >
                <h3 className="text-white font-semibold text-lg">{task.title}</h3>
                <p className="text-white/60 mt-2 text-sm">{task.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.status === 'done'
                        ? 'bg-green-400/20 text-green-400'
                        : task.status === 'in_progress'
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {task.status === 'done'
                      ? 'مكتمل'
                      : task.status === 'in_progress'
                      ? 'قيد التنفيذ'
                      : 'معلق'}
                  </span>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    disabled={isUpdating}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  >
                    <option value="pending">معلق</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="done">مكتمل</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;