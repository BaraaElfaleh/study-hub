/**
 * Mock data for classroom module
 * This file should be replaced with actual API calls when backend is ready
 */

import type { LectureDTO, TaskDTO, AnnouncementDTO, ChatMessageDTO } from '../dtos/classroomDto';


export const mockLecturesData: LectureDTO[] = [
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
  {
    id: 'lec-003',
    course_id: 'course-001',
    title: 'Routing مع React Router',
    video_url: 'https://example.com/video3.mp4',
    drive_link: 'https://drive.google.com/file/d/example',
    order: 3,
    completed_by: [],
    created_at: '2026-01-18T10:00:00Z',
    updated_at: '2026-01-18T10:00:00Z',
  },
];

export const mockTasksData: TaskDTO[] = [
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
  {
    id: 'task-003',
    course_id: 'course-001',
    title: 'بناء مشروع متكامل',
    description: 'أنشئ تطبيق كامل باستخدام كل ما تعلمته من المحاضرات.',
    due_date: '2026-07-01T23:59:59Z',
    status: 'pending',
    assigned_to: null,
    created_at: '2026-02-15T10:00:00Z',
  },
];

export const mockAnnouncementsData: AnnouncementDTO[] = [
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
  {
    id: 'ann-003',
    course_id: 'course-001',
    title: 'أماكن الدعم الأكاديمي',
    body: 'يمكنكم الاستفادة من جلسات الدعم الأكاديمي كل يوم ثلاثاء الساعة 5 مساءً.',
    created_at: '2026-05-25T10:00:00Z',
    author: { id: 'user-002', name: 'الأستاذ خالد' },
  },
];

export const mockChatMessagesData: ChatMessageDTO[] = [
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
  {
    id: 'msg-003',
    course_id: 'course-001',
    sender_id: 'user-001',
    sender_name: 'أحمد محمد',
    text: 'شكراً لك، أتطلع إلى ذلك!',
    timestamp: '2026-05-24T09:10:00Z',
  },
];
