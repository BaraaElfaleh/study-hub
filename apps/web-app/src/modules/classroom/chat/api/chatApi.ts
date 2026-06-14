// src/modules/classroom/chat/api/chatApi.ts
import client from '../../../../shared/api/client';
import type { ChatMessage, SendMessageRequest } from '../../../../shared/types/classroom';

export const chatApi = {
  getMessages: async (courseId: string, page = 1, limit = 50): Promise<ChatMessage[]> => {
    const { data } = await client.get<ChatMessage[]>(`/courses/${courseId}/chat`, {
      params: { page, limit },
    });
    return data;
  },

  sendMessage: async (courseId: string, payload: SendMessageRequest): Promise<ChatMessage> => {
    const { data } = await client.post<ChatMessage>(`/courses/${courseId}/chat`, payload);
    return data;
  },
};