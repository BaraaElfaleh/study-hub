import { createFileRoute } from '@tanstack/react-router';
import ClassroomOverview from '../../../../modules/classroom/views/ClassroomOverview';
export const Route = createFileRoute('/_protected/classroom/$classroomId/')({ component: ClassroomOverview });