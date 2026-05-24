// Data Transfer Objects - تمثل البيانات كما تصل من API

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
  status: 'pending' | 'in_progress' | 'done';
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