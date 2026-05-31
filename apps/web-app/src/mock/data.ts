// src/mock/data.ts
import type { User } from '../shared/types/auth';
import type { Course } from '../shared/types/course';
import type {
  LectureDTO,
  TaskDTO,
  AnnouncementDTO,
  ChatMessageDTO,
} from '../modules/classroom/dtos/classroomDto';
import type { NotificationDTO } from '../modules/notifications/dtos/notificationDto';




export const mockUser: User = {
  id: 'user-001',
  name: 'أحمد محمد',
  email: 'ahmed@alnoon.com',
  role: 'teacher',
  avatar: 'https://i.pravatar.cc/150?u=khaled@alnoon.com',
  createdAt: new Date().toISOString(),
};

export const mockInstructor: User = {
  id: 'user-002',
  name: 'الأستاذ خالد',
  email: 'khaled@alnoon.com',
  role: 'teacher',
  avatar: 'https://i.pravatar.cc/150?u=sara@alnoon.com',
  createdAt: new Date().toISOString(),
};

// ======================== الكورسات ========================
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

// ======================== المحاضرات ========================
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

// ======================== المهام ========================
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

// ======================== الإعلانات ========================
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

// ======================== الدردشة ========================
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

// ======================== الإشعارات ========================
export const mockNotifications: NotificationDTO[] = [
  {
    id: 'notif-001',
    user_id: 'user-001',
    type: 'announcement',
    title: 'إعلان هام',
    message: 'تم تأجيل موعد الاختبار النهائي إلى يوم الأحد القادم.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: '/classroom/course-001/announcements',
  },
  {
    id: 'notif-002',
    user_id: 'user-001',
    type: 'task_due',
    title: 'موعد تسليم مهمة',
    message: 'باقي ساعتين على موعد تسليم مهمة "بناء واجهة React".',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    link: '/classroom/course-001/tasks',
  },
  {
    id: 'notif-003',
    user_id: 'user-001',
    type: 'new_chat',
    title: 'رسالة جديدة من الأستاذ خالد',
    message: 'أحسنت في المشروع الأخير، استمر.',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    link: '/classroom/course-001/chat',
  },
  {
    id: 'notif-004',
    user_id: 'user-001',
    type: 'enrollment',
    title: 'تم التسجيل بنجاح',
    message: 'مرحباً بك في كورس "تصميم تجربة المستخدم".',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: '/classroom/course-002',
  },
];