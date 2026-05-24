// src/routes/_protected/courses/$courseId.tsx
import { createFileRoute } from '@tanstack/react-router';
import { CourseDetailPage } from '../../../modules/courses';

export const Route = createFileRoute('/_protected/tsx/courses/$courseId')({
  component: CourseDetailPage,
  
});