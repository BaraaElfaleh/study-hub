import { createFileRoute } from '@tanstack/react-router';
import ChatRoom from '../../../../../modules/classroom/chat/views/ChatRoom';
export const Route = createFileRoute('/_protected/classroom/$classroomId/chat/')({ component: ChatRoom });