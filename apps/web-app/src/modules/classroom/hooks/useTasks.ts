import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptTask } from '../adapters/classroomAdapter';
import type { Task, TaskStatusEnum } from '../dtos/classroomDto';

interface UseTaksReturn {
  tasks: Task[] | undefined;
  isLoading: boolean;
  error: Error | null;
  updateTaskStatus: (params: { taskId: string; status: TaskStatusEnum }) => void;
  isUpdating: boolean;
}

export const useTasks = (courseId: string): UseTaksReturn => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', courseId, 'tasks'];

  const tasksQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getTasks(courseId);
      return dtos.map(adaptTask);
    },
    enabled: !!courseId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: TaskStatusEnum;
    }) => classroomApi.updateTaskStatus(taskId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    tasks: tasksQuery.data,
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    updateTaskStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};