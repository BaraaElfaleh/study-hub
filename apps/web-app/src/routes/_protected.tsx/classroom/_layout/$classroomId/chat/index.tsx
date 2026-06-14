// src/routes/_protected/tsx/classroom/_layout/$classroomId/chat/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import ChatRoom from '../../../../../../modules/classroom/chat/views/ChatRoom';

export const Route = createFileRoute('/_protected/tsx/classroom/_layout/$classroomId/chat/')({
  component: ChatRoom,
});