import { createFileRoute } from '@tanstack/react-router';
import LectureDetailPage from '../../../../../modules/classroom/lectures/views/LectureDetailPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/lectures/$lectureId')({ component: LectureDetailPage });