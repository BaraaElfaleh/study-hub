// src/modules/classroom/index.ts

// ─── تخطيط ونظرة عامة (Views) ───
export { default as ClassroomLayout } from './views/ClassroomLayout';
export { default as ClassroomOverview } from './views/ClassroomOverview';

// ─── المحاضرات (Lectures) ───
export { lecturesApi } from './lectures/api/lecturesApi';
export { useLectures } from './lectures/hooks/useLectures';
export { default as LectureListPage } from './lectures/views/LectureListPage';

// ─── الواجبات والتسليمات (Assignments & Submissions) ───
export { assignmentsApi } from './assignments/api/assignmentsApi';
export { useAssignments } from './assignments/hooks/useAssignments';
export { useSubmissions } from './assignments/hooks/useSubmissions';
export { default as AssignmentListPage } from './assignments/views/AssignmentListPage';

// ─── الإعلانات (Announcements) ───
export { announcementsApi } from './announcements/api/announcementsApi';
export { useAnnouncements } from './announcements/hooks/useAnnouncements';
export { default as AnnouncementListPage } from './announcements/views/AnnouncementListPage';

// ─── المحادثة (Chat) ───
export { chatApi } from './chat/api/chatApi';
export { useChat } from './chat/hooks/useChat';
export { default as ChatRoom } from './chat/views/ChatRoom';

// ─── الاختبارات (Quizzes) ───
export { quizzesApi } from './quizzes/api/quizzesApi';
export { useQuizzes } from './quizzes/hooks/useQuizzes';
export { default as QuizListPage } from './quizzes/views/QuizListPage';

// ─── التسجيلات (Enrollments) ───
export { enrollmentApi } from './enrollments/api/enrollmentApi';
export { useCourseEnrollments } from './enrollments/hooks/useCourseEnrollments';
export { useMyEnrollments } from './enrollments/hooks/useMyEnrollments';

// ─── المخزن المشترك (Store) ───
export { useClassroomStore } from './store/classroomStore';
export type { ActiveFeature } from './store/classroomStore';

// المحاضرات
export { useLectureDetail } from './lectures/hooks/useLectureDetail';
export { default as LectureDetailPage } from './lectures/views/LectureDetailPage';

// الاختبارات
export { useQuizEditor } from './quizzes/hooks/useQuizEditor';
export { default as QuizEditorPage } from './quizzes/views/QuizEditorPage';