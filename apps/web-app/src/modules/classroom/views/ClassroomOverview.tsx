import { useParams, Link } from "@tanstack/react-router";
import { BookOpen, CheckSquare, Bell, Plus, Users } from "lucide-react";
import { useLectures } from "../hooks/useLectures";
import { useTasks } from "../hooks/useTasks";
import { useAnnouncements } from "../hooks/useAnnouncements";
import { useAuthStore } from "../../auth/store/authStore";

const ClassroomOverview = () => {
  const { classroomId } = useParams({
    from: "/_protected/tsx/classroom/_layout/$classroomId/",
  });
  const { lectures, isLoading: isLoadingLectures } = useLectures(classroomId);
  const { tasks: assignments, isLoading: isLoadingTasks } =
    useTasks(classroomId);
  const { data: announcements, isLoading: isLoadingAnnouncements } =
    useAnnouncements(classroomId);
  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === "TEACHER";

  const totalStudents = 156;
  const totalLectures = lectures?.length ?? 0;
  const totalTasks = assignments?.length ?? 0;
  const isLoading =
    isLoadingLectures || isLoadingTasks || isLoadingAnnouncements;

  if (isLoading)
    return (
      <div className="text-white/60 text-center py-10">جاري التحميل...</div>
    );

  return (
    <div
      className="min-h-full bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] p-6 md:p-10 rounded-2xl"
      dir="rtl"
    >
      <div className="space-y-8 text-right">
        <h2 className="text-3xl font-bold text-white">نظرة عامة على الفصل</h2>
        {isTeacher && (
          <p className="text-white/60">
            أهلاً بك أستاذ {user?.firstName} {user?.lastName}
          </p>
        )}
        {isTeacher && (
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tsx/classroom/$classroomId/lectures"
              params={{ classroomId }}
              className="flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] px-4 py-2 rounded-xl"
            >
              <Plus size={18} />
              إضافة محاضرة
            </Link>
            <button
              onClick={() => alert("ستتوفر المهام قريباً")}
              className="flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] px-4 py-2 rounded-xl"
            >
              <Plus size={18} />
              إضافة مهمة
            </button>
            <Link
              to="/tsx/classroom/$classroomId/announcements"
              params={{ classroomId }}
              className="flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] px-4 py-2 rounded-xl"
            >
              <Plus size={18} />
              إضافة إعلان
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 p-5 rounded-2xl text-center">
            <Users className="text-amber-400 mx-auto mb-2" />
            <div className="text-white text-2xl">{totalStudents}</div>
            <div className="text-white/60 text-sm">طالب</div>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl text-center">
            <BookOpen className="text-amber-400 mx-auto mb-2" />
            <div className="text-white text-2xl">{totalLectures}</div>
            <div className="text-white/60 text-sm">محاضرات</div>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl text-center">
            <CheckSquare className="text-amber-400 mx-auto mb-2" />
            <div className="text-white text-2xl">{totalTasks}</div>
            <div className="text-white/60 text-sm">مهام</div>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl text-center">
            <Bell className="text-amber-400 mx-auto mb-2" />
            <div className="text-white text-2xl">
              {announcements?.length ?? 0}
            </div>
            <div className="text-white/60 text-sm">إعلانات</div>
          </div>
        </div>
        <div>
          <h3 className="text-xl text-white mb-3">
            <BookOpen className="text-amber-400 inline ml-2" />
            المحاضرات
          </h3>
          {lectures?.slice(0, 3).map((lec) => (
            <div key={lec.id} className="bg-white/5 p-4 rounded-xl mb-2">
              <h4 className="text-white">{lec.title}</h4>
              <p className="text-white/60 text-sm">
                {new Date(lec.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
          ))}
          {totalLectures > 3 && (
            <Link
              to="/tsx/classroom/$classroomId/lectures"
              params={{ classroomId }}
              className="text-amber-400 text-sm"
            >
              عرض الكل
            </Link>
          )}
        </div>
        <div>
          <h3 className="text-xl text-white mb-3">
            <CheckSquare className="text-amber-400 inline ml-2" />
            المهام
          </h3>
          {assignments?.slice(0, 2).map((task) => (
            <div key={task.id} className="bg-white/5 p-4 rounded-xl mb-2">
              <h4 className="text-white">{task.title}</h4>
              <p className="text-white/60 text-sm">{task.description}</p>
            </div>
          ))}
          {totalTasks > 0 && (
            <button
              onClick={() => alert("قريباً")}
              className="text-amber-400 text-sm"
            >
              عرض الكل
            </button>
          )}
        </div>
        <div>
          <h3 className="text-xl text-white mb-3">
            <Bell className="text-amber-400 inline ml-2" />
            الإعلانات
          </h3>
          {announcements?.slice(0, 2).map((ann) => (
            <div key={ann.id} className="bg-white/5 p-4 rounded-xl mb-2">
              <h4 className="text-white">{ann.title}</h4>
              <p className="text-white/60 text-sm">{ann.content}</p>
              {ann.author && (
                <p className="text-white/40 text-xs mt-1">
                  {ann.author.firstName} {ann.author.lastName}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassroomOverview;