export const TaskStatusEnum = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export type TaskStatus = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  videoUrl?: string | null;
  driveLink?: string | null;
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
  status: TaskStatus;
  assignedTo: string[];
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
  id: string;
  courseId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'failed'; // للاستخدام المحلي
}