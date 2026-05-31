import { useParams } from '@tanstack/react-router';
import { useLectures } from '../hooks/useLectures';
import { useClassroomStore } from '../store/classroomStore';
import { Loader } from '../../../shared/components/ui/Loader';
import { BookOpen, Play, CheckCircle } from 'lucide-react';

const LectureView = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/lectures' }) as { classroomId: string };
  const { data: lectures, isLoading, error } = useLectures(classroomId);
  const { currentLectureId, setCurrentLectureId } = useClassroomStore();

  return (
    <div className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 md:p-10 rounded-2xl relative overflow-hidden" dir="rtl">
      {/* تأثيرات خلفية (نقاط مضيئة وتوهج) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* عنوان القسم */}
        <div className="flex items-center gap-2 mb-8">
          <BookOpen size={28} className="text-amber-400" />
          <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            المحاضرات
          </h2>
        </div>

        {/* حالات التحميل والخطأ والفراغ */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <p className="text-red-400">فشل تحميل المحاضرات</p>
          </div>
        )}
        {!isLoading && !error && lectures?.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">لا توجد محاضرات بعد</p>
          </div>
        )}

        {/* قائمة المحاضرات */}
        {!isLoading && !error && lectures && lectures.length > 0 && (
          <div className="space-y-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                onClick={() => setCurrentLectureId(lecture.id)}
                className={`group p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  currentLectureId === lecture.id
                    ? 'bg-amber-400/10 border-amber-400/40 shadow-lg shadow-amber-400/5'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      currentLectureId === lecture.id
                        ? 'bg-amber-400/20 text-amber-400'
                        : 'bg-white/10 text-white/60 group-hover:bg-amber-400/10 group-hover:text-amber-400'
                    } transition-colors`}>
                      {lecture.completedBy?.includes("user-001") ? (
                        <CheckCircle size={20} className="text-green-400" />
                      ) : (
                        <Play size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg transition-colors ${
                        currentLectureId === lecture.id
                          ? 'text-amber-400'
                          : 'text-white group-hover:text-white'
                      }`}>
                        {lecture.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-white/40 text-sm">
                          المحاضرة {lecture.order}
                        </span>
                        {lecture.videoUrl && (
                          <span className="text-amber-400/80 text-sm flex items-center gap-1">
                            <Play size={12} />
                            فيديو تعليمي
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {lecture.completedBy?.includes("user-001") && (
                    <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
                      مكتملة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureView;