import type {
  Lecture,
  Assignment,
  Announcement,
  ChatMessage,
  Submission,
} from '../../../shared/types/classroom';

export const adaptLecture = (dto: any): Lecture => ({
  id: dto.id,
  title: dto.title,
  description: dto.description || '',
  videoUrl: dto.videoUrl,
  documentUrl: dto.documentUrl,
  courseId: dto.courseId,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

export const adaptAssignment = (dto: any): Assignment => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  courseId: dto.courseId,
  createdAt: dto.createdAt,
});

export const adaptAnnouncement = (dto: any): Announcement => ({
  id: dto.id,
  title: dto.title,
  content: dto.content || dto.body,
  courseId: dto.courseId,
  author: dto.author,
  createdAt: dto.createdAt,
});

export const adaptChatMessage = (dto: any): ChatMessage => ({
  id: dto.id,
  content: dto.content || dto.text,
  senderId: dto.senderId,
  sender: dto.sender,
  courseId: dto.courseId,
  createdAt: dto.createdAt,
});

export const adaptSubmission = (dto: any): Submission => ({
  id: dto.id,
  fileUrl: dto.fileUrl,
  submittedAt: dto.submittedAt,
  studentId: dto.studentId,
  assignmentId: dto.assignmentId,
});