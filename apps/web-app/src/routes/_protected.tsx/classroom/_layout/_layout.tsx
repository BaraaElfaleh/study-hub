// src/routes/_protected/tsx/classroom/_layout.tsx
import { createFileRoute } from '@tanstack/react-router';
import ClassroomLayout from '../../../../modules/classroom/views/ClassroomLayout';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/_layout')({
  component: ClassroomLayout,
});