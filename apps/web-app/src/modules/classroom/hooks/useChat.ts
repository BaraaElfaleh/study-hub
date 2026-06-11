import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptChatMessage } from '../adapters/classroomAdapter';
import type { ChatMessage } from '../../../shared/types/classroom';
import { useAuthStore } from '../../auth/store/authStore';

export const useChat = (courseId: string) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const queryKey = ['classroom', courseId, 'chat'];

  const messagesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getChatMessages(courseId);
      return dtos.map(adaptChatMessage);
    },
    enabled: !!courseId,
    refetchInterval: 5000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => classroomApi.sendChatMessage(courseId, { content }),
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData<ChatMessage[]>(queryKey);
      if (!user) return { previousMessages };
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage: ChatMessage = {
        id: tempId,
        courseId,
        senderId: user.id,
        sender: { id: user.id, firstName: user.firstName || '', lastName: user.lastName || '' },
        content,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) => [...old, optimisticMessage]);
      return { previousMessages };
    },
    onError: (_err, _content, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKey, context.previousMessages);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    messages: messagesQuery.data,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
};