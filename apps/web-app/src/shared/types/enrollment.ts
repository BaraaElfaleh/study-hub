export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
  course?: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    level: string;
  };
}

export interface UpdateProgressRequest {
  progress: number;
}