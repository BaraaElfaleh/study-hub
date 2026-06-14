// src/modules/classroom/views/ClassroomOverview.tsx
import { useParams } from '@tanstack/react-router';
import { useLectures } from '../lectures/hooks/useLectures';
import { useAssignments } from '../assignments/hooks/useAssignments';
import { useAnnouncements } from '../announcements/hooks/useAnnouncements';
import { useQuizzes } from '../quizzes/hooks/useQuizzes';
import { BookOpen, CheckSquare, Bell, Users } from 'lucide-react';

export default function ClassroomOverview() {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/' }) as { classroomId: string };
  const { lectures } = useLectures(classroomId);
  const { assignments } = useAssignments(classroomId);
  const { data: announcements } = useAnnouncements(classroomId);
  const { quizzes } = useQuizzes(classroomId);

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <h2 className="text-3xl font-bold text-white mb-8">نظرة عامة على الفصل</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<BookOpen className="text-amber-400" />} value={lectures.length} label="محاضرة" />
        <StatCard icon={<CheckSquare className="text-amber-400" />} value={assignments.length} label="واجب" />
        <StatCard icon={<Bell className="text-amber-400" />} value={announcements?.length || 0} label="إعلان" />
        <StatCard icon={<Users className="text-amber-400" />} value={quizzes?.length || 0} label="اختبار" />
      </div>
      <div className="text-white/60">اختر تبويب من القائمة الجانبية للوصول إلى المحتوى.</div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}