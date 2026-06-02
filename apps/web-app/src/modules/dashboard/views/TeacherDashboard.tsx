import { Link } from '@tanstack/react-router';
import { BookOpen, Users, ClipboardList, Bell } from 'lucide-react';
import { mockCourses, mockTasks, mockAnnouncements } from '../../../mock/data';

const TeacherDashboard = () => {
  const teachingCourses = mockCourses.filter((c) => c.instructorId === 'user-002');
  const assignedTasks = mockTasks.slice(0, 3);
  const announcements = mockAnnouncements.slice(0, 2);
  const totalStudents = 1245; // رقم وهمي

  return (
    <div className="space-y-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        أهلاً بعودتك، <span className="text-amber-400">أستاذ خالد</span>
      </h1>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <BookOpen size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{teachingCourses.length}</div>
          <div className="text-white/60 text-sm">كورسات تدرسها</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <Users size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{totalStudents}</div>
          <div className="text-white/60 text-sm">طالب مسجل</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <ClipboardList size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{assignedTasks.length}</div>
          <div className="text-white/60 text-sm">مهام قمت بتعيينها</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-amber-400/20 transition-all">
          <Bell size={28} className="text-amber-400 mb-3" />
          <div className="text-3xl font-bold text-white">{announcements.length}</div>
          <div className="text-white/60 text-sm">إعلانات منشورة</div>
        </div>
      </div>

      {/* كورساتي */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={24} className="text-amber-400" />
          كورسات تدرسها
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teachingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <h3 className="text-white font-semibold">{course.title}</h3>
              <p className="text-white/60 text-sm mt-1">
                المستوى:{' '}
                {course.level === 'beginner'
                  ? 'مبتدئ'
                  : course.level === 'intermediate'
                    ? 'متوسط'
                    : 'متقدم'}
              </p>
              <Link
                to="/tsx/classroom/$classroomId"
                params={{ classroomId: course.id }}
                className="text-amber-400 text-sm mt-3 inline-block"
              >
                إدارة الفصل ←
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* آخر المهام */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <ClipboardList size={24} className="text-amber-400" />
          آخر المهام المعلقة
        </h2>
        <div className="space-y-3">
          {assignedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-white font-medium">{task.title}</h3>
                <p className="text-white/60 text-sm">
                  {task.due_date || task.due_date}
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-400/10 text-amber-400">
                {task.status === 'in_progress' ? 'قيد التنفيذ' : 'معلق'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* إعلاناتك */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell size={24} className="text-amber-400" />
          إعلاناتك الأخيرة
        </h2>
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="text-white font-medium">{ann.title}</h3>
              <p className="text-white/60 text-sm mt-1">{ann.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;