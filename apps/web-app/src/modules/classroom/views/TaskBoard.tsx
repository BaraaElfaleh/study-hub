import { useParams } from '@tanstack/react-router';
import { useTasks } from '../hooks/useTasks';

const TaskBoard = () => {
const { classroomId } = useParams({ from: '/tsx/classroom/$classroomId' }as any) ;
  const { tasks, isLoading, error, updateTaskStatus, isUpdating } = useTasks(classroomId);

  if (isLoading) return <p className="text-white/60">تحميل المهام...</p>;
  if (error) return <p className="text-red-400">فشل تحميل المهام</p>;

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div
          key={task.id}
          className="bg-white/5 border border-white/10 rounded-xl p-5"
        >
          <h3 className="text-white font-semibold text-lg">{task.title}</h3>
          <p className="text-white/60 mt-2">{task.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                task.status === 'done'
                  ? 'bg-green-400/20 text-green-400'
                  : task.status === 'in-progress'
                  ? 'bg-amber-400/20 text-amber-400'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {task.status === 'done'
                ? 'مكتمل'
                : task.status === 'in-progress'
                ? 'قيد التنفيذ'
                : 'معلق'}
            </span>
            <select
              value={task.status}
              onChange={(e) =>
                updateTaskStatus({
                  taskId: task.id,
                  status: e.target.value as any,
                })
              }
              disabled={isUpdating}
              className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm"
            >
              <option value="pending">معلق</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="done">مكتمل</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;