import { createFileRoute } from '@tanstack/react-router';
import LectureListPage from '../../../../../modules/classroom/lectures/views/LectureListPage';
export const Route = createFileRoute('/_protected/classroom/$classroomId/lectures/')({ component: LectureListPage });