// ─── Lectures ────────────────────────────────────
export interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  documentUrl?: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLectureRequest {
  title: string;
  description?: string;
  videoUrl?: string;
  documentUrl?: string;
}

export interface UpdateLectureRequest {
  title?: string;
  description?: string;
  videoUrl?: string;
  documentUrl?: string;
}

// ─── Assignments ─────────────────────────────────
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  createdAt: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
}

// ─── Submissions ─────────────────────────────────
export interface Submission {
  id: string;
  fileUrl: string;
  submittedAt: string;
  studentId: string;
  assignmentId: string;
}

export interface SubmitAssignmentRequest {
  fileUrl: string;
}

// ─── Quizzes ─────────────────────────────────────
export interface Quiz {
  id: string;
  title: string;
  formUrl: string;
  courseId: string;
  createdAt: string;
}

export interface CreateQuizRequest {
  title: string;
  formUrl: string;
}

export interface UpdateQuizRequest {
  title?: string;
}

// ─── Announcements ───────────────────────────────
export interface Announcement {
  id: string;
  title: string;
  content: string;
  courseId: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
}

// ─── Chat ────────────────────────────────────────
export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  courseId: string;
  createdAt: string;
}

export interface SendMessageRequest {
  content: string;
}