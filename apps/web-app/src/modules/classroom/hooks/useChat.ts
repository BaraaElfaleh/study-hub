import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';
import { adaptChatMessage } from '../adapters/classroomAdapter';
import type { ChatMessage } from '../dtos/classroomDto';
import { useAuthStore } from '../../auth/store/authStore';

/**
 * هوك إدارة الدردشة داخل الفصل الدراسي.
 * يوفر قائمة الرسائل، حالة التحميل، وإرسال رسائل جديدة بتحديث متفائل.
 */
export const useChat = (courseId: string) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const queryKey = ['classroom', courseId, 'chat'];

  // جلب الرسائل مع إعادة الجلب كل 5 ثوانٍ (محاكاة WebSocket)
  const messagesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const dtos = await classroomApi.getChatMessages(courseId);
      return dtos.map(adaptChatMessage);
    },
    enabled: !!courseId,
    refetchInterval: 5000,
  });

  // إرسال رسالة مع تحديث متفائل
  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => classroomApi.sendChatMessage(courseId, text),
    onMutate: async (text) => {
      // إلغاء أي استعلامات معلقة لتجنب التعارض مع التحديث المتفائل
      await queryClient.cancelQueries({ queryKey });

      // حفظ القائمة السابقة للتراجع في حال الخطأ
      const previousMessages = queryClient.getQueryData<ChatMessage[]>(queryKey);

      // تأمين: لا نضيف رسالة مؤقتة إذا لم يكن هناك مستخدم
      if (!user) return { previousMessages };

      // إنشاء معرف فريد للرسالة المؤقتة (crypto متاح في المتصفحات الحديثة)
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

      // تحديث الكاش مباشرة
      queryClient.setQueryData<ChatMessage[]>(queryKey, (old = []) => [
        ...old,
        optimisticMessage,
      ]);

      return { previousMessages };
    },
    onSuccess: (data, variables) => {
      // استبدال الرسالة المؤقتة بالبيانات الحقيقية من الخادم
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
      // في حالة الفشل: إعادة القائمة السابقة أو تعليم الرسالة كفاشلة
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKey, context.previousMessages);
      } else {
        // لو لم نتمكن من التراجع، نترك الرسالة ونعلمها كفاشلة
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
      // إعادة المزامنة مع الخادم بعد النجاح أو الفشل
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