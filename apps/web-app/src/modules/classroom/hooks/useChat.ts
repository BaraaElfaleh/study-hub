// src/modules/classroom/hooks/useChat.ts
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
    mutationFn: (text: string) => classroomApi.sendChatMessage(courseId, text),
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData<ChatMessage[]>(queryKey);

      if (!user) return { previousMessages };

      const tempId = `temp-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
      const optimisticMessage: ChatMessage = {
        id: tempId,
        courseId: courseId,
        senderId: user.id,
        senderName: user.name,
        text,
        timestamp: new Date().toISOString(),
        status: 'sending',
      };

      queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) => [...old, optimisticMessage]);
      return { previousMessages };
    },
    onSuccess: (data, variables) => {
      const newMessage = adaptChatMessage(data);
      queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) =>
        old.map((msg) =>
          msg.id.startsWith('temp-') && msg.text === variables
            ? { ...newMessage, status: 'sent' }
            : msg
        )
      );
    },
    onError: (_err, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKey, context.previousMessages);
      } else {
        queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) =>
          old.map((msg) =>
            msg.id.startsWith('temp-') && msg.status === 'sending'
              ? { ...msg, status: 'failed' }
              : msg
          )
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: string) => classroomApi.deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    messages: messagesQuery.data,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
    deleteMessage: deleteMessageMutation.mutate,
    isDeleting: deleteMessageMutation.isPending,
  };
};