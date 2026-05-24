import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import classroomApi from '../api/classroomApi';
import { adaptTask } from '../adapters/classroomAdapter';

export const useTasks = (classroomId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', classroomId, 'tasks'];

  const tasksQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getTasks(classroomId);
      return dtos.map(adaptTask);
    },
    enabled: !!classroomId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: 'pending' | 'in_progress' | 'done';
    }) => classroomApi.updateTaskStatus(taskId, status),
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