/**
 * Classroom API Service
 */
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

import { mockCoursesData } from '../../courses/api/mock';

class ClassroomApiService extends BaseApiService {
  // ─── الإعلانات ───
  async addAnnouncement(
    courseId: string,
    data: { title: string; body: string },
    author: { id: string; name: string }
  ): Promise<AnnouncementDTO> {
    await addDelay(500);
    const newAnnouncement: AnnouncementDTO = {
      id: `ann-${Date.now()}`,
      course_id: courseId,
      title: data.title,
      body: data.body,
      created_at: new Date().toISOString(),
      author,
    };
    mockAnnouncementsData.unshift(newAnnouncement);
    return newAnnouncement;
  }

  // ─── المهام ───
  async addTask(
    courseId: string,
    data: { title: string; description: string; due_date: string }
  ): Promise<TaskDTO> {
    await addDelay(400);
    const newTask: TaskDTO = {
      id: `task-${Date.now()}`,
      course_id: courseId,
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      status: 'pending',
      assigned_to: null,
      created_at: new Date().toISOString(),
    };
    mockTasksData.push(newTask);
    return newTask;
  }

  async deleteTask(taskId: string): Promise<void> {
    await addDelay(300);
    const index = mockTasksData.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('المهمة غير موجودة');
    mockTasksData.splice(index, 1);
  }

  async updateTask(
    taskId: string,
    updates: Partial<Pick<TaskDTO, 'title' | 'description' | 'due_date' | 'status'>>
  ): Promise<TaskDTO> {
    await addDelay(400);
    const index = mockTasksData.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('المهمة غير موجودة');
    mockTasksData[index] = { ...mockTasksData[index], ...updates };
    return mockTasksData[index];
  }

  // ─── المحاضرات ───
  async addLecture(
    courseId: string,
    data: { title: string; video_url?: string; order: number }
  ): Promise<LectureDTO> {
    await addDelay(400);
    const newLecture: LectureDTO = {
      id: `lec-${Date.now()}`,
      course_id: courseId,
      title: data.title,
      video_url: data.video_url ?? null,
      drive_link: null,
      order: data.order,
      completed_by: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockLecturesData.push(newLecture);
    return newLecture;
  }

  async updateLecture(
    lectureId: string,
    updates: Partial<Pick<LectureDTO, 'title' | 'video_url' | 'order'>>
  ): Promise<LectureDTO> {
    await addDelay(400);
    const index = mockLecturesData.findIndex((l) => l.id === lectureId);
    if (index === -1) throw new Error('المحاضرة غير موجودة');
    mockLecturesData[index] = { ...mockLecturesData[index], ...updates };
    return mockLecturesData[index];
  }

  async deleteLecture(lectureId: string): Promise<void> {
    await addDelay(300);
    const index = mockLecturesData.findIndex((l) => l.id === lectureId);
    if (index === -1) throw new Error('المحاضرة غير موجودة');
    mockLecturesData.splice(index, 1);
  }

  // ─── الدردشة ───
  async deleteMessage(messageId: string): Promise<void> {
    await addDelay(300);
    const index = mockChatMessagesData.findIndex((m) => m.id === messageId);
    if (index !== -1) {
      mockChatMessagesData.splice(index, 1);
    }
  }

  // ─── الطلاب وإدارة الفصل ───
  async getEnrolledStudents(courseId: string): Promise<{ id: string; name: string; email: string; enrolledAt: string }[]> {
    await addDelay(400);
    console.log(`Fetching students for course: ${courseId}`);
    return [
      { id: 'student-001', name: 'أحمد محمد', email: 'ahmed@example.com', enrolledAt: '2026-01-20T10:00:00Z' },
      { id: 'student-002', name: 'سارة علي', email: 'sara@example.com', enrolledAt: '2026-02-05T10:00:00Z' },
      { id: 'student-003', name: 'كريم حسين', email: 'karim@example.com', enrolledAt: '2026-03-10T10:00:00Z' },
    ];
  }

  async removeStudentFromClassroom(courseId: string, studentId: string): Promise<void> {
    await addDelay(300);
    console.log(`Student ${studentId} removed from course ${courseId}`);
  }

  async addStudentToClassroom(courseId: string, email: string): Promise<{ id: string; name: string; email: string; enrolledAt: string }> {
    await addDelay(500);
    console.log(`Adding student to course: ${courseId}`);
    return {
      id: `student-${Date.now()}`,
      name: email.split('@')[0],
      email,
      enrolledAt: new Date().toISOString(),
    };
  }

  async updateClassroom(courseId: string, data: { title?: string; description?: string; level?: string }): Promise<void> {
    await addDelay(400);
    const course = mockCoursesData.find((c: any) => c.id === courseId);
    if (course) {
      Object.assign(course, data);
    }
  }

  // ─── الجلب الأساسي ───
  async getLectures(courseId: string): Promise<LectureDTO[]> {
    await addDelay(500);
    return mockLecturesData.filter((l) => l.course_id === courseId);
  }

  async getTasks(courseId: string): Promise<TaskDTO[]> {
    await addDelay(500);
    return mockTasksData.filter((t) => t.course_id === courseId);
  }

  async updateTaskStatus(taskId: string, payload: UpdateTaskStatusPayload): Promise<TaskDTO> {
    await addDelay(300);
    const taskIndex = mockTasksData.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) throw new Error('المهمة غير موجودة');
    mockTasksData[taskIndex] = { ...mockTasksData[taskIndex], status: payload.status };
    return mockTasksData[taskIndex];
  }

  async getAnnouncements(courseId: string): Promise<AnnouncementDTO[]> {
    await addDelay(400);
    return mockAnnouncementsData.filter((a) => a.course_id === courseId);
  }

  async getChatMessages(courseId: string): Promise<ChatMessageDTO[]> {
    await addDelay(300);
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

export const classroomApi = new ClassroomApiService();