// src/modules/classroom/api/classroomApi.ts

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

import { mockCourses } from '../../../mock/data';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const classroomApi = {
  // ─── الإعلانات ───
  addAnnouncement: async (
    courseId: string,
    data: { title: string; body: string },
    author: { id: string; name: string }
  ): Promise<AnnouncementDTO> => {
    await delay(500);
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
  },

  // ─── المهام ───
  addTask: async (courseId: string, data: { title: string; description: string; due_date: string }): Promise<TaskDTO> => {
    await delay(400);
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
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await delay(300);
    const index = mockTasksData.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('المهمة غير موجودة');
    mockTasksData.splice(index, 1);
  },

  updateTask: async (taskId: string, updates: Partial<Pick<TaskDTO, 'title' | 'description' | 'due_date' | 'status'>>): Promise<TaskDTO> => {
    await delay(400);
    const index = mockTasksData.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('المهمة غير موجودة');
    mockTasksData[index] = { ...mockTasksData[index], ...updates };
    return mockTasksData[index];
  },

  // ─── المحاضرات ───
  addLecture: async (courseId: string, data: { title: string; video_url?: string; order: number }): Promise<LectureDTO> => {
    await delay(400);
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
  },

  updateLecture: async (lectureId: string, updates: Partial<Pick<LectureDTO, 'title' | 'video_url' | 'order'>>): Promise<LectureDTO> => {
    await delay(400);
    const index = mockLecturesData.findIndex((l) => l.id === lectureId);
    if (index === -1) throw new Error('المحاضرة غير موجودة');
    mockLecturesData[index] = { ...mockLecturesData[index], ...updates };
    return mockLecturesData[index];
  },

  deleteLecture: async (lectureId: string): Promise<void> => {
    await delay(300);
    const index = mockLecturesData.findIndex((l) => l.id === lectureId);
    if (index === -1) throw new Error('المحاضرة غير موجودة');
    mockLecturesData.splice(index, 1);
  },

  // ─── الدردشة ───
  deleteMessage: async (messageId: string): Promise<void> => {
    await delay(300);
    const index = mockChatMessagesData.findIndex((m) => m.id === messageId);
    if (index !== -1) {
      mockChatMessagesData.splice(index, 1);
    }
  },

  // ─── الطلاب وإدارة الفصل ───
  getEnrolledStudents: async (courseId: string): Promise<{ id: string; name: string; email: string; enrolledAt: string }[]> => {
    await delay(400);
    console.log(`Fetching students for course: ${courseId}`);
    return [
      { id: 'student-001', name: 'أحمد محمد', email: 'ahmed@example.com', enrolledAt: '2026-01-20T10:00:00Z' },
      { id: 'student-002', name: 'سارة علي', email: 'sara@example.com', enrolledAt: '2026-02-05T10:00:00Z' },
      { id: 'student-003', name: 'كريم حسين', email: 'karim@example.com', enrolledAt: '2026-03-10T10:00:00Z' },
    ];
  },

  removeStudentFromClassroom: async (courseId: string, studentId: string): Promise<void> => {
    await delay(300);
    console.log(`Student ${studentId} removed from course ${courseId}`);
  },

  addStudentToClassroom: async (courseId: string, email: string): Promise<{ id: string; name: string; email: string; enrolledAt: string }> => {
    await delay(500);
    console.log(`Adding student to course: ${courseId}`);
    return {
      id: `student-${Date.now()}`,
      name: email.split('@')[0],
      email,
      enrolledAt: new Date().toISOString(),
    };
  },

  updateClassroom: async (courseId: string, data: { title?: string; description?: string; level?: string }): Promise<void> => {
    await delay(400);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const course = mockCourses.find((c: any) => c.id === courseId);
    if (course) {
      Object.assign(course, data);
    }
  },

  // ─── الجلب الأساسي ───
  getLectures: async (courseId: string): Promise<LectureDTO[]> => {
    await delay(500);
    return mockLecturesData.filter((l) => l.course_id === courseId);
  },

  getTasks: async (courseId: string): Promise<TaskDTO[]> => {
    await delay(500);
    return mockTasksData.filter((t) => t.course_id === courseId);
  },

  updateTaskStatus: async (taskId: string, payload: UpdateTaskStatusPayload): Promise<TaskDTO> => {
    await delay(300);
    const taskIndex = mockTasksData.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) throw new Error('المهمة غير موجودة');
    mockTasksData[taskIndex] = { ...mockTasksData[taskIndex], status: payload.status };
    return mockTasksData[taskIndex];
  },

  getAnnouncements: async (courseId: string): Promise<AnnouncementDTO[]> => {
    await delay(400);
    return mockAnnouncementsData.filter((a) => a.course_id === courseId);
  },

  getChatMessages: async (courseId: string): Promise<ChatMessageDTO[]> => {
    await delay(300);
    return (mockChatMessagesData || []).filter((m) => m.course_id === courseId);
  },

  sendChatMessage: async (courseId: string, text: string): Promise<ChatMessageDTO> => {
    await delay(200);
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
  },
};