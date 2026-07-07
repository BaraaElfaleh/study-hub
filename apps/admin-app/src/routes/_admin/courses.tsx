import { createFileRoute } from '@tanstack/react-router';
import CoursesListPage from '../../modules/courses/pages/CoursesListPage';
export const Route = createFileRoute('/_admin/courses')({ component: CoursesListPage });