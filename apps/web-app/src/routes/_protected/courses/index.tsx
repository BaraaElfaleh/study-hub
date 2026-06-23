import { createFileRoute } from '@tanstack/react-router';
import CourseListPage from '../../../modules/courses/views/student/CourseListPage';
export const Route = createFileRoute('/_protected/courses/')({ component: CourseListPage });