// apps/web-app/src/modules/classroom/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptAssignment } from '../adapters/classroomAdapter';
import type { Assignment, CreateAssignmentRequest, UpdateAssignmentRequest } from '../../../shared/types/classroom';

interface UseTasksReturn {
  tasks: Assignment[] | undefined;
  isLoading: boolean;
  error: Error | null;
  addTask: (data: CreateAssignmentRequest) => void;
  isAdding: boolean;
  updateTask: (params: { taskId: string; updates: UpdateAssignmentRequest }) => void;
  isUpdatingTask: boolean;
  deleteTask: (taskId: string) => void;
  isDeleting: boolean;
}

export const useTasks = (courseId: string): UseTasksReturn => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', courseId, 'assignments'];

  const tasksQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getAssignments(courseId);
      return dtos.map(adaptAssignment);
    },
    enabled: !!courseId,
  });

  const addTaskMutation = useMutation({
    mutationFn: (data: CreateAssignmentRequest) => classroomApi.createAssignment(courseId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: UpdateAssignmentRequest }) =>
      classroomApi.updateAssignment(courseId, taskId, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => classroomApi.deleteAssignment(courseId, taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    tasks: tasksQuery.data,
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    addTask: addTaskMutation.mutate,
    isAdding: addTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdatingTask: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
  };
};