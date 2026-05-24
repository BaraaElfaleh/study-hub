// src/routes/_protected/courses/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { CourseListPage } from '../../../modules/courses';

export const Route = createFileRoute('/_protected/tsx/courses/')({
  component: CourseListPage,
});