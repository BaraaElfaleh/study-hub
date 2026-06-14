// src/modules/classroom/chat/hooks/useChat.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '../api/chatApi';
import type { ChatMessage } from '../../../../shared/types/classroom';

export const useChat = (courseId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['chat', courseId];

  const {
    data: messages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => chatApi.getMessages(courseId),
    enabled: !!courseId,
    refetchInterval: 5000, // تحديث تلقائي كل 5 ثوان
  });

  const sendMutation = useMutation({
    mutationFn: (content: string) => chatApi.sendMessage(courseId, { content }),
    onMutate: async (content) => {
      // إلغاء أي تحديثات قادمة
      await queryClient.cancelQueries({ queryKey });
      // حفظ الرسائل السابقة للتراجع
      const previous = queryClient.getQueryData<ChatMessage[]>(queryKey) ?? [];
      // إضافة رسالة متفائلة
      const optimisticMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content,
        senderId: 'me', // سيتم استبداله بالبيانات الحقيقية عند النجاح
        courseId,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) => [...old, optimisticMessage]);
      return { previous };
    },
    onError: (_err, _content, context) => {
      // التراجع عن الإضافة المتفائلة
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage: sendMutation.mutate,
    isSending: sendMutation.isPending,
  };
};