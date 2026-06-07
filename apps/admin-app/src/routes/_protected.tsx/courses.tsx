// apps/admin-app/src/routes/courses.tsx
import { createFileRoute } from '@tanstack/react-router';
import { CourseListPage } from '../../modules/courses';

export const Route = createFileRoute('/_protected/tsx/courses')({
  component: CourseListPage,
});