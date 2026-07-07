export interface Course {
  id: string;
  title: string;
  description: string;
  teacher?: { firstName: string; lastName: string };
  isActive: boolean;
  createdAt: string;
}
