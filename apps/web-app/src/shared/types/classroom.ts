// src/shared/types/classroom.ts
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
  status: 'pending' | 'in-progress' | 'done';
  assignedTo: string[];
  createdAt: string; // ← أضف هذا
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  body: string;
  createdAt: string;
  author: { // ← أضف هذا
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
}