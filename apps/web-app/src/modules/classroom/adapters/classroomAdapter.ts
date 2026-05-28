import { format, parseISO } from 'date-fns'; // افتراض وجود date-fns
import { ar } from 'date-fns/locale'; // للتعريب
import type {
  LectureDTO,
  TaskDTO,
  AnnouncementDTO,
  ChatMessageDTO,
} from '../dtos/classroomDto';
import type {
  Lecture,
  Task,
  Announcement,
  ChatMessage,
} from '../../../shared/types/classroom';

// تحويل النماذج من صيغة API إلى صيغة UI
export const adaptLecture = (dto: LectureDTO): Lecture => ({
  id: dto.id,
  courseId: dto.course_id,
  title: dto.title,
  videoUrl: dto.video_url,
  driveLink: dto.drive_link,
  order: dto.order,
  completedBy: dto.completed_by,
  createdAt: format(parseISO(dto.created_at), 'PPpp', { locale: ar }),
  updatedAt: format(parseISO(dto.updated_at), 'PPpp', { locale: ar }),
});

export const adaptTask = (dto: TaskDTO): Task => ({
  id: dto.id,
  courseId: dto.course_id,
  title: dto.title,
  description: dto.description,
  dueDate: format(parseISO(dto.due_date), 'PPP', { locale: ar }),
  status: dto.status === 'in_progress' ? 'in-progress' : dto.status,
  assignedTo: dto.assigned_to ?? [],
  createdAt: format(parseISO(dto.created_at), 'PPpp', { locale: ar }),
});

export const adaptAnnouncement = (dto: AnnouncementDTO): Announcement => ({
  id: dto.id,
  courseId: dto.course_id,
  title: dto.title,
  body: dto.body,
  createdAt: format(parseISO(dto.created_at), 'PPpp', { locale: ar }),
  author: dto.author,
});

export const adaptChatMessage = (dto: ChatMessageDTO): ChatMessage => ({
  id: dto.id,
  courseId: dto.course_id,
  senderId: dto.sender_id,
  senderName: dto.sender_name,
  text: dto.text,
  timestamp: format(parseISO(dto.timestamp), 'p', { locale: ar }),
});