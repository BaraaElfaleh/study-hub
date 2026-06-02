// تم حذف تعريفات Lecture, Task, Announcement, ChatMessage لأنها في @/shared/types
// نستورد TaskStatusEnum من shared (الذي أصبح اسمه TaskStatus)
import type { TaskStatus } from '../../../shared/types/classroom';

// ==================== API DTOs (snake_case) ====================
export interface LectureDTO {
  id: string;
  course_id: string;
  title: string;
  video_url: string | null;
  drive_link: string | null;
  order: number;
  completed_by: string[];
  created_at: string;
  updated_at: string;
}

export interface TaskDTO {
  id: string;
  course_id: string;
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
  assigned_to: string[] | null;
  created_at: string;
}

export interface AnnouncementDTO {
  id: string;
  course_id: string;
  title: string;
  body: string;
  created_at: string;
  author: {
    id: string;
    name: string;
  };
}

export interface ChatMessageDTO {
  id: string;
  course_id: string;
  sender_id: string;
  sender_name: string;
  text: string;
  timestamp: string;
}

// ==================== Request Types ====================
export interface FetchLecturesParams { courseId: string; }
export interface FetchTasksParams { courseId: string; status?: TaskStatus; }
export interface FetchAnnouncementsParams { courseId: string; }
export interface FetchChatMessagesParams { courseId: string; }

export interface UpdateTaskStatusPayload {
  status: TaskStatus;
}

export interface SendChatMessagePayload {
  text: string;
}

// ==================== Mutation State Type ====================
export interface MutationState {
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
}