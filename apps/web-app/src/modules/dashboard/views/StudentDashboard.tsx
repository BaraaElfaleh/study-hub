import { Link } from '@tanstack/react-router';
import {
  BookOpen,
  ClipboardList,
  Bell,
  TrendingUp,
} from 'lucide-react';
import { mockCourses, mockTasks, mockAnnouncements } from '../../../mock/data';

const StudentDashboard = () => {
  // بيانات وهمية للطالب
  const enrolledCourses = mockCourses.slice(0, 3); // أول 3 كورسات
  const upcomingTasks = mockTasks.filter(t => t.status !== 'done').slice(0, 3);
  const recentAnnouncements = mockAnnouncements.slice(0, 2);

  const progress = 62; // نسبة مئوية عامة

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">
        أهلاً بعودتك، <span className="text-amber-400">أحمد</span>
      </h1>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <BookOpen size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{enrolledCourses.length}</div>
          <div className="text-white/60 text-sm">كورسات مسجل بها</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <ClipboardList size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{upcomingTasks.length}</div>
          <div className="text-white/60 text-sm">مهام قادمة</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <Bell size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{recentAnnouncements.length}</div>
          <div className="text-white/60 text-sm">إعلانات جديدة</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <TrendingUp size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{progress}%</div>
          <div className="text-white/60 text-sm">التقدم العام</div>
        </div>
      </div>

      {/* كورساتي النشطة */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={24} className="text-amber-400" />
          كورساتي النشطة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <h3 className="text-white font-semibold">{course.title}</h3>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-3">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.floor(Math.random() * 80 + 10)}%` }} />
              </div>
              <Link to="/tsx/classroom/$classroomId/lectures" params={{ classroomId: course.id } as any} className="text-amber-400 text-sm mt-3 inline-block">
                متابعة التعلم ←
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* مهام قادمة */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <ClipboardList size={24} className="text-amber-400" />
          مهام قادمة
        </h2>
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-medium">{task.title}</h3>
                <p className="text-white/60 text-sm">{task.due_date}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-400/10 text-amber-400">
                {task.status === 'in_progress' ? 'قيد التنفيذ' : 'معلق'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* آخر الإعلانات */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell size={24} className="text-amber-400" />
          آخر الإعلانات
        </h2>
        <div className="space-y-3">
          {recentAnnouncements.map((ann) => (
            <div key={ann.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-medium">{ann.title}</h3>
              <p className="text-white/60 text-sm mt-1">{ann.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;