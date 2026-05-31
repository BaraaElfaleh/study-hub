/**
 * Classroom API Service
 * تمت معالجة أخطاء الـ Import وتوحيد المسارات
 */

// تأكد أن اسم الملف هو baseApiService.ts (بحرف s صغيرة) كما في مسارك
import { BaseApiService, addDelay } from '../../../shared/api/baseApiService'; 
import type {
  LectureDTO,
  TaskDTO,
  AnnouncementDTO,
  ChatMessageDTO,
  UpdateTaskStatusPayload,
} from '../dtos/classroomDto';
import {
  mockLecturesData,
  mockTasksData,
  mockAnnouncementsData,
  mockChatMessagesData,
} from './mock';

class ClassroomApiService extends BaseApiService {
  
  async getLectures(courseId: string): Promise<LectureDTO[]> {
    await addDelay(500);
    return mockLecturesData.filter((l) => l.course_id === courseId);
  }

  async getTasks(courseId: string): Promise<TaskDTO[]> {
    await addDelay(500);
    return mockTasksData.filter((t) => t.course_id === courseId);
  }

  async updateTaskStatus(
    taskId: string,
    payload: UpdateTaskStatusPayload
  ): Promise<TaskDTO> {
    await addDelay(300);
    
    // استخدام findIndex للوصول للمهمة وتعديلها بأمان
    const taskIndex = mockTasksData.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      throw new Error('المهمة غير موجودة');
    }

    // تحديث الحالة مع التأكد من النوع
    mockTasksData[taskIndex] = {
      ...mockTasksData[taskIndex],
      status: payload.status,
    };

    return mockTasksData[taskIndex];
  }

  async getAnnouncements(courseId: string): Promise<AnnouncementDTO[]> {
    await addDelay(400);
    return mockAnnouncementsData.filter((a) => a.course_id === courseId);
  }

  async getChatMessages(courseId: string): Promise<ChatMessageDTO[]> {
    await addDelay(300);
    // تأكد من وجود المصفوفة لتجنب undefined
    return (mockChatMessagesData || []).filter((m) => m.course_id === courseId);
  }

  async sendChatMessage(courseId: string, text: string): Promise<ChatMessageDTO> {
    await addDelay(200);
    
    const newMsg: ChatMessageDTO = {
      id: `msg-${Date.now()}`,
      course_id: courseId,
      sender_id: 'user-001',
      sender_name: 'أحمد محمد',
      text,
      timestamp: new Date().toISOString(),
    };

    mockChatMessagesData.push(newMsg);
    return newMsg;
  }
}

// تصدير singleton instance
export const classroomApi = new ClassroomApiService();