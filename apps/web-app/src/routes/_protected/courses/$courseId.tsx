import { createFileRoute } from '@tanstack/react-router';
import CourseDetailPage from '../../../modules/courses/views/student/CourseDetailPage';
export const Route = createFileRoute('/_protected/courses/$courseId')({ component: CourseDetailPage });