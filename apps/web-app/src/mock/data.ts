// src/mock/data.ts
import type { User } from '@/shared/types/auth';
import type { Course } from '@/shared/types/course';
import type {
  LectureDTO,
  TaskDTO,
  AnnouncementDTO,
  ChatMessageDTO,
} from '@/modules/classroom/dtos/classroomDto';

// مستخدم تجريبي
export const mockUser: User = {
  id: 'user-001',
  name: 'أحمد محمد',
  email: 'ahmed@alnoon.com',
  role: 'student',
  avatar: undefined,
  createdAt: new Date().toISOString(),
};

// مستخدم آخر (للدردشة)
export const mockInstructor: User = {
  id: 'user-002',
  name: 'الأستاذ خالد',
  email: 'khaled@alnoon.com',
  role: 'teacher',
  avatar: undefined,
  createdAt: new Date().toISOString(),
};

// قائمة الدورات
export const mockCourses: Course[] = [
  {
    id: 'course-001',
    title: 'تطوير واجهات الويب بـ React',
    description:
      'تعلم React من الصفر إلى الاحتراف مع مشاريع عملية تغطي hooks، routing، state management.',
    thumbnail: '',
    level: 'beginner',
    price: 149,
    instructorId: 'user-002',
    instructorName: 'الأستاذ خالد',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'course-002',
    title: 'تصميم تجربة المستخدم (UI/UX)',
    description:
      'أسس تصميم واجهات جذابة وسهلة الاستخدام باستخدام Figma ومبادئ التصميم الحديثة.',
    thumbnail: '',
    level: 'intermediate',
    price: 199,
    instructorId: 'user-002',
    instructorName: 'الأستاذة سارة',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 'course-003',
    title: 'تطوير تطبيقات الموبايل بـ Flutter',
    description: 'بناء تطبيقات موبايل تعمل على Android و iOS باستخدام Flutter و Dart.',
    thumbnail: '',
    level: 'beginner',
    price: 179,
    instructorId: 'user-002',
    instructorName: 'الأستاذ محمد',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-05-05T10:00:00Z',
  },
];

// محاضرات لفصل تجريبي
export const mockLectures: LectureDTO[] = [
  {
    id: 'lec-001',
    course_id: 'course-001',
    title: 'مقدمة في React وبناء المكونات',
    video_url: 'https://example.com/video1.mp4',
    drive_link: null,
    order: 1,
    completed_by: ['user-001'],
    created_at: '2026-01-16T10:00:00Z',
    updated_at: '2026-01-16T10:00:00Z',
  },
  {
    id: 'lec-002',
    course_id: 'course-001',
    title: 'إدارة الحالة باستخدام Hooks',
    video_url: 'https://example.com/video2.mp4',
    drive_link: null,
    order: 2,
    completed_by: [],
    created_at: '2026-01-17T10:00:00Z',
    updated_at: '2026-01-17T10:00:00Z',
  },
];

// مهام
export const mockTasks: TaskDTO[] = [
  {
    id: 'task-001',
    course_id: 'course-001',
    title: 'بناء مكون لقائمة المهام',
    description: 'استخدم useState و useEffect لإنشاء قائمة مهام تفاعلية.',
    due_date: '2026-06-01T23:59:59Z',
    status: 'in_progress',
    assigned_to: null,
    created_at: '2026-02-01T10:00:00Z',
  },
  {
    id: 'task-002',
    course_id: 'course-001',
    title: 'تطبيق Context API',
    description: 'أنشئ سياقًا لإدارة حالة المستخدم عبر التطبيق.',
    due_date: '2026-06-15T23:59:59Z',
    status: 'pending',
    assigned_to: null,
    created_at: '2026-02-10T10:00:00Z',
  },
];

// إعلانات
export const mockAnnouncements: AnnouncementDTO[] = [
  {
    id: 'ann-001',
    course_id: 'course-001',
    title: 'محاضرة إضافية يوم الجمعة',
    body: 'سيتم عقد محاضرة إضافية لمناقشة مشاريع التخرج يوم الجمعة الساعة 8 مساءً.',
    created_at: '2026-05-20T10:00:00Z',
    author: { id: 'user-002', name: 'الأستاذ خالد' },
  },
  {
    id: 'ann-002',
    course_id: 'course-001',
    title: 'تأجيل موعد الاختبار',
    body: 'تم تأجيل الاختبار النهائي إلى يوم الأحد القادم بسبب ظروف فنية.',
    created_at: '2026-05-22T10:00:00Z',
    author: { id: 'user-002', name: 'الأستاذ خالد' },
  },
];

// رسائل الدردشة
export const mockChatMessages: ChatMessageDTO[] = [
  {
    id: 'msg-001',
    course_id: 'course-001',
    sender_id: 'user-001',
    sender_name: 'أحمد محمد',
    text: 'مرحباً، هل يمكن شرح مفهوم useEffect مرة أخرى؟',
    timestamp: '2026-05-24T09:00:00Z',
  },
  {
    id: 'msg-002',
    course_id: 'course-001',
    sender_id: 'user-002',
    sender_name: 'الأستاذ خالد',
    text: 'بالتأكيد، سأخصص بداية المحاضرة القادمة لشرح useEffect بالتفصيل.',
    timestamp: '2026-05-24T09:05:00Z',
  },
];