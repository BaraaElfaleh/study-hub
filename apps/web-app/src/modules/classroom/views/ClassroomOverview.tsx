import { useParams, Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckSquare,
  Bell,
  TrendingUp,
  Play,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { mockLectures, mockTasks, mockAnnouncements } from "../../../mock/data";

const ClassroomOverview = () => {
  const { classroomId } = useParams({
    from: "/_protected/tsx/classroom/$classroomId/",
  }) as { classroomId: string };

  const lectures = mockLectures.filter((l) => l.course_id === classroomId);
  const tasks = mockTasks.filter((t) => t.course_id === classroomId);
  const announcements = mockAnnouncements.filter(
    (a) => a.course_id === classroomId,
  );

  const completedLectures = lectures.filter((l) =>
    l.completed_by.includes("user-001"),
  ).length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* عنوان */}
      <h2 className="text-3xl font-bold text-white">نظرة عامة على الفصل</h2>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* محاضرات */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <BookOpen size={24} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{lectures.length}</div>
          <div className="text-white/60 text-sm">محاضرات</div>
        </div>

        {/* مهام */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <CheckSquare size={24} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{tasks.length}</div>
          <div className="text-white/60 text-sm">مهام</div>
        </div>

        {/* إعلانات */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <Bell size={24} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {announcements.length}
          </div>
          <div className="text-white/60 text-sm">إعلانات</div>
        </div>

        {/* تقدم المحاضرات */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <TrendingUp size={24} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {lectures.length
              ? Math.round((completedLectures / lectures.length) * 100)
              : 0}
            %
          </div>
          <div className="text-white/60 text-sm">تقدم المحاضرات</div>
        </div>
      </div>

      {/* آخر المحاضرات */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-amber-400" />
          المحاضرات
        </h3>
        <div className="space-y-3">
          {lectures.slice(0, 3).map((lec) => (
            <div
              key={lec.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-all"
            >
              <div>
                <h4 className="text-white font-medium">{lec.title}</h4>
                <p className="text-white/60 text-sm">الترتيب: {lec.order}</p>
              </div>
              {lec.completed_by.includes("user-001") ? (
                <span className="text-amber-400 text-sm bg-amber-400/10 px-3 py-1 rounded-full">✔ مكتملة</span>
              ) : (
                <Link
                  to="/tsx/classroom/$classroomId/lectures"
                  params={{ classroomId }}
                  className="text-amber-400 text-sm flex items-center gap-1 hover:text-amber-300 transition-colors"
                >
                  <Play size={14} /> مشاهدة
                </Link>
              )}
            </div>
          ))}
          {lectures.length > 3 && (
            <Link
              to="/tsx/classroom/$classroomId/lectures"
              params={{ classroomId }}
              className="text-amber-400 text-sm inline-flex items-center gap-1 hover:text-amber-300 transition-colors mt-2"
            >
              عرض الكل <ChevronLeft size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* مهام عاجلة */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-400" />
          مهام عاجلة
        </h3>
        {pendingTasks > 0 ? (
          <div className="space-y-3">
            {tasks
              .filter((t) => t.status !== "done")
              .slice(0, 2)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-all"
                >
                  <div>
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <p className="text-white/60 text-sm">
                      موعد التسليم: {task.due_date}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.status === "in_progress"
                        ? "bg-amber-400/10 text-amber-400"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {task.status === "in_progress" ? "قيد التنفيذ" : "معلق"}
                  </span>
                </div>
              ))}
            <Link
              to="/tsx/classroom/$classroomId/tasks"
              params={{ classroomId }}
              className="text-amber-400 text-sm inline-flex items-center gap-1 hover:text-amber-300 transition-colors mt-2"
            >
              عرض جميع المهام <ChevronLeft size={14} />
            </Link>
          </div>
        ) : (
          <p className="text-white/60">لا توجد مهام عاجلة حالياً.</p>
        )}
      </div>

      {/* آخر الإعلانات */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell size={20} className="text-amber-400" />
          آخر الإعلانات
        </h3>
        {announcements.length > 0 ? (
          <div className="space-y-3">
            {announcements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <h4 className="text-white font-medium">{ann.title}</h4>
                <p className="text-white/60 text-sm mt-1">{ann.body}</p>
              </div>
            ))}
            <Link
              to="/tsx/classroom/$classroomId/announcements"
              params={{ classroomId }}
              className="text-amber-400 text-sm inline-flex items-center gap-1 hover:text-amber-300 transition-colors mt-2"
            >
              عرض جميع الإعلانات <ChevronLeft size={14} />
            </Link>
          </div>
        ) : (
          <p className="text-white/60">لا توجد إعلانات بعد.</p>
        )}
      </div>
    </div>
  );
};

export default ClassroomOverview;