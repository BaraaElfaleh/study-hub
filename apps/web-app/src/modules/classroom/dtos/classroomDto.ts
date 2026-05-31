/**
 * Classroom Module Type Definitions
 * تم تعديل الكود ليكون متوافقاً مع إعدادات المشروع الصارمة
 */

// ==================== Enum Replacement (النمط الحديث الآمن) ====================

export const TaskStatusEnum = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type TaskStatusEnum =
  (typeof TaskStatusEnum)[keyof typeof TaskStatusEnum];

// ==================== DTO Types (Server responses) ====================

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
  status: TaskStatusEnum;
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
  status?: string;
}

// ==================== Domain Model Types (Frontend) ====================

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string | null;
  driveLink: string | null;
  order: number;
  completedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatusEnum;
  assignedTo: string[] | null;
  createdAt: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  body: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface ChatMessage {
  status: string;
  id: string;
  courseId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

// ==================== Request Types ====================

export interface FetchLecturesParams {
  courseId: string;
}

export interface FetchTasksParams {
  courseId: string;
  status?: TaskStatusEnum;
}

export interface FetchAnnouncementsParams {
  courseId: string;
}

export interface FetchChatMessagesParams {
  courseId: string;
}

export interface UpdateTaskStatusPayload {
  status: TaskStatusEnum;
}

export interface SendChatMessagePayload {
  text: string;
}

// ==================== API Response Types ====================

export interface LecturesApiResponse {
  data: LectureDTO[];
}

export interface TasksApiResponse {
  data: TaskDTO[];
}

export interface AnnouncementsApiResponse {
  data: AnnouncementDTO[];
}

export interface ChatMessagesApiResponse {
  data: ChatMessageDTO[];
}

export interface TaskUpdateApiResponse {
  data: TaskDTO;
}

export interface ChatMessageApiResponse {
  data: ChatMessageDTO;
}

// ==================== Mutation State Type ====================

export interface MutationState {
  isPending: boolean;
  error: Error | null;
  isSuccess: boolean;
}

// ==================== Hooks Return Types ====================

export interface UseClassroomReturn {
  lectures: Lecture[] | undefined;
  tasks: Task[] | undefined;
  announcements: Announcement[] | undefined;
  chatMessages: ChatMessage[] | undefined;

  isLoadingLectures: boolean;
  isLoadingTasks: boolean;
  isLoadingAnnouncements: boolean;
  isLoadingChat: boolean;

  lecturesError: Error | null;
  tasksError: Error | null;
  announcementsError: Error | null;
  chatError: Error | null;

  updateTaskStatus: (taskId: string, status: TaskStatusEnum) => void;
  sendChatMessage: (text: string) => void;

  updateTaskState: MutationState;
  sendMessageState: MutationState;
}

export interface UseClassroomDetailsReturn {
  lectures: Lecture[] | undefined;
  tasks: Task[] | undefined;
  announcements: Announcement[] | undefined;

  isLoadingLectures: boolean;
  isLoadingTasks: boolean;
  isLoadingAnnouncements: boolean;

  lecturesError: Error | null;
  tasksError: Error | null;
  announcementsError: Error | null;
}
