// src/modules/classroom/api/classroomApi.ts
import type {
  LectureDTO,
  TaskDTO,
  AnnouncementDTO,
  ChatMessageDTO,
} from '../dtos/classroomDto';
import {
  mockLectures,
  mockTasks,
  mockAnnouncements,
  mockChatMessages,
} from '../../../mock/data';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const classroomApi = {
  getLectures: async (_classroomId: string): Promise<LectureDTO[]> => {
    await delay(500);
    return mockLectures;
  },

  getTasks: async (_classroomId: string): Promise<TaskDTO[]> => {
    await delay(500);
    return mockTasks;
  },

  updateTaskStatus: async (
    taskId: string,
    status: 'pending' | 'in_progress' | 'done'
  ): Promise<TaskDTO> => {
    await delay(300);
    const task = mockTasks.find((t) => t.id === taskId);
    if (!task) throw new Error('المهمة غير موجودة');
    task.status = status;
    return task;
  },

  getAnnouncements: async (_classroomId: string): Promise<AnnouncementDTO[]> => {
    await delay(400);
    return mockAnnouncements;
  },

  getChatMessages: async (_classroomId: string): Promise<ChatMessageDTO[]> => {
    await delay(300);
    return mockChatMessages;
  },

  sendChatMessage: async (
    _classroomId: string,
    text: string
  ): Promise<ChatMessageDTO> => {
    await delay(200);
    const newMsg: ChatMessageDTO = {
      id: `msg-${Date.now()}`,
      course_id: _classroomId,
      sender_id: 'user-001',
      sender_name: 'أحمد محمد',
      text,
      timestamp: new Date().toISOString(),
    };
    mockChatMessages.push(newMsg);
    return newMsg;
  },
};

export default classroomApi;