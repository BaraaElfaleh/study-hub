import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import classroomApi from '../api/classroomApi';
import { adaptChatMessage } from '../adapters/classroomAdapter';

export const useChat = (classroomId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['classroom', classroomId, 'chat'];

  const messagesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getChatMessages(classroomId);
      return dtos.map(adaptChatMessage);
    },
    enabled: !!classroomId,
    refetchInterval: 5000, // محاكاة webhook/polling
  });

  const sendMessageMutation = useMutation({
    mutationFn: (text: string) =>
      classroomApi.sendChatMessage(classroomId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
};