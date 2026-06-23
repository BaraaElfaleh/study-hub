import { createFileRoute, Outlet } from '@tanstack/react-router';
import ClassroomLayout from '../../../modules/classroom/views/ClassroomLayout';

export const Route = createFileRoute('/_protected/classroom/_layout')({
  component: () => (
    <ClassroomLayout>
      <Outlet />
    </ClassroomLayout>
  ),
});