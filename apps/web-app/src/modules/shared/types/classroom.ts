export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  videoUrl?: string;
  driveLink?: string;
  order: number;
  completedBy?: string[]; // user ids
}

export type TaskStatus = 'pending' | 'in-progress' | 'done';

export interface Task {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  assignedTo?: string[]; // user ids (if specific)
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  courseId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}