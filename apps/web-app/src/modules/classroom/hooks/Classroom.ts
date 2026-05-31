import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import {
  adaptLecture,
  adaptTask,
  adaptAnnouncement,
  adaptChatMessage,
} from '../adapters/classroomAdapter';
import {
  type UseClassroomReturn,
  type TaskStatusEnum,
} from '../dtos/classroomDto';

export const useClassroom = (courseId: string): UseClassroomReturn => {
  const queryClient = useQueryClient();

  // ==================== Queries ====================
  // يتم استدعاء جميع الـ Hooks دائماً بنفس الترتيب (قاعدة React الأساسية)

  const lecturesQuery = useQuery({
    queryKey: ['classroom', courseId, 'lectures'],
    queryFn: async () => {
      const dtos = await classroomApi.getLectures(courseId);
      return dtos.map(adaptLecture);
    },
    enabled: !!courseId, // لن يتم الطلب إلا إذا كان courseId موجوداً
    staleTime: 2 * 60 * 1000,
  });

  const tasksQuery = useQuery({
    queryKey: ['classroom', courseId, 'tasks'],
    queryFn: async () => {
      const dtos = await classroomApi.getTasks(courseId);
      return dtos.map(adaptTask);
    },
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000,
  });

  const announcementsQuery = useQuery({
    queryKey: ['classroom', courseId, 'announcements'],
    queryFn: async () => {
      const dtos = await classroomApi.getAnnouncements(courseId);
      return dtos.map(adaptAnnouncement);
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  const chatQuery = useQuery({
    queryKey: ['classroom', courseId, 'chat'],
    queryFn: async () => {
      const dtos = await classroomApi.getChatMessages(courseId);
      return dtos.map(adaptChatMessage);
    },
    enabled: !!courseId,
    refetchInterval: 5000,
    staleTime: 0,
  });

  // ==================== Mutations ====================

  const updateTaskMutation = useMutation({
    mutationFn: (params: { taskId: string; status: TaskStatusEnum }) =>
      classroomApi.updateTaskStatus(params.taskId, { status: params.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'tasks'] });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => classroomApi.sendChatMessage(courseId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'chat'] });
    },
  });

  // ==================== Handlers ====================

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatusEnum) => {
    updateTaskMutation.mutate({ taskId, status });
  };

  const handleSendMessage = (text: string) => {
    sendMessageMutation.mutate(text);
  };

  // ==================== Return ====================

  return {
    lectures: lecturesQuery.data,
    tasks: tasksQuery.data,
    announcements: announcementsQuery.data,
    chatMessages: chatQuery.data,

    isLoadingLectures: lecturesQuery.isLoading,
    isLoadingTasks: tasksQuery.isLoading,
    isLoadingAnnouncements: announcementsQuery.isLoading,
    isLoadingChat: chatQuery.isLoading,

    lecturesError: lecturesQuery.error as Error | null,
    tasksError: tasksQuery.error as Error | null,
    announcementsError: announcementsQuery.error as Error | null,
    chatError: chatQuery.error as Error | null,

    updateTaskStatus: handleUpdateTaskStatus,
    sendChatMessage: handleSendMessage,

    updateTaskState: {
      isPending: updateTaskMutation.isPending,
      error: updateTaskMutation.error as Error | null,
      isSuccess: updateTaskMutation.isSuccess,
    },
    sendMessageState: {
      isPending: sendMessageMutation.isPending,
      error: sendMessageMutation.error as Error | null,
      isSuccess: sendMessageMutation.isSuccess,
    },
  };
};