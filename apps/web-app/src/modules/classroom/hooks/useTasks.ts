// src/modules/classroom/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptTask } from '../adapters/classroomAdapter';
import type { Task, TaskStatus } from '../../../shared/types/classroom';

interface UseTasksReturn {
  tasks: Task[] | undefined;
  isLoading: boolean;
  error: Error | null;
  updateTaskStatus: (params: { taskId: string; status: TaskStatus }) => void;
  isUpdatingStatus: boolean;
  addTask: (data: { title: string; description: string; due_date: string }) => void;
  isAdding: boolean;
  deleteTask: (taskId: string) => void;
  isDeleting: boolean;
  updateTask: (params: { taskId: string; updates: Partial<Pick<Task, 'title' | 'description' | 'dueDate' | 'status'>> }) => void;
  isUpdatingTask: boolean;
}

export const useTasks = (courseId: string): UseTasksReturn => {
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
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      classroomApi.updateTaskStatus(taskId, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const addTaskMutation = useMutation({
    mutationFn: (data: { title: string; description: string; due_date: string }) =>
      classroomApi.addTask(courseId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => classroomApi.deleteTask(taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<Pick<Task, 'title' | 'description' | 'dueDate' | 'status'>> }) => {
      const dtoUpdates: Record<string, unknown> = {};
      if (updates.title !== undefined) dtoUpdates.title = updates.title;
      if (updates.description !== undefined) dtoUpdates.description = updates.description;
      if (updates.dueDate !== undefined) dtoUpdates.due_date = updates.dueDate;
      if (updates.status !== undefined) dtoUpdates.status = updates.status;
      return classroomApi.updateTask(taskId, dtoUpdates);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    tasks: tasksQuery.data,
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    updateTaskStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    addTask: addTaskMutation.mutate,
    isAdding: addTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdatingTask: updateTaskMutation.isPending,
  };
};