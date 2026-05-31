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
import { useLectures } from "../hooks/useLectures";
import { useTasks } from "../hooks/useTasks";
import { useAnnouncements } from "../hooks/useAnnouncements";
import type { Task } from "../dtos/classroomDto"; // ⬅️ استيراد النوع

const ClassroomOverview = () => {
  const { classroomId } = useParams({
    from: "/_protected/tsx/classroom/_layout/$classroomId/",
  });

  const { data: lectures, isLoading: isLoadingLectures } = useLectures(classroomId);
  // ✅ `useTasks` يُرجع `tasks` مباشرةً، وليس `data`
  const { tasks, isLoading: isLoadingTasks } = useTasks(classroomId);
  const { data: announcements, isLoading: isLoadingAnnouncements } = useAnnouncements(classroomId);

  const completedLectures =
    lectures?.filter((l) => l.completedBy?.includes("user-001")).length ?? 0;
  const pendingTasks = tasks?.filter((t: Task) => t.status !== "done").length ?? 0;
  const totalLectures = lectures?.length ?? 0;
  const lectureProgress = totalLectures
    ? Math.round((completedLectures / totalLectures) * 100)
    : 0;

  const isLoading = isLoadingLectures || isLoadingTasks || isLoadingAnnouncements;

  return (
    <div className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 md:p-10 rounded-2xl relative overflow-hidden" dir="rtl">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      {isLoading ? (
        <div className="relative z-10 text-center py-10">
          <div className="text-white/60">جاري التحميل...</div>
        </div>
      ) : (
        <div className="relative z-10 space-y-8 text-right">
          <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            نظرة عامة على الفصل
          </h2>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <BookOpen size={24} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{totalLectures}</div>
              <div className="text-white/60 text-sm">محاضرات</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <CheckSquare size={24} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{tasks?.length ?? 0}</div>
              <div className="text-white/60 text-sm">مهام</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <Bell size={24} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{announcements?.length ?? 0}</div>
              <div className="text-white/60 text-sm">إعلانات</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <TrendingUp size={24} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{lectureProgress}%</div>
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
              {lectures?.slice(0, 3).map((lec) => (
                <div
                  key={lec.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-all"
                >
                  <div>
                    <h4 className="text-white font-medium">{lec.title}</h4>
                    <p className="text-white/60 text-sm">الترتيب: {lec.order}</p>
                  </div>
                  {lec.completedBy?.includes("user-001") ? (
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
              {totalLectures > 3 && (
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
                  ?.filter((t: Task) => t.status !== "done") // ⬅️ تحديد النوع
                  .slice(0, 2)
                  .map((task: Task) => ( // ⬅️ تحديد النوع
                    <div
                      key={task.id}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-all"
                    >
                      <div>
                        <h4 className="text-white font-medium">{task.title}</h4>
                        <p className="text-white/60 text-sm">موعد التسليم: {task.dueDate}</p>
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
            {announcements && announcements.length > 0 ? (
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
      )}
    </div>
  );
};

export default ClassroomOverview;