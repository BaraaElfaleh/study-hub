// src/modules/classroom/lectures/views/LectureDetailPage.tsx
import { useParams, Link } from '@tanstack/react-router';
import { useLectureDetail } from '../hooks/useLectureDetail';
import  Loader  from '../../../../shared/components/ui/Loader';
import { ArrowRight, Video, FileText } from 'lucide-react';

const LectureDetailPage = () => {
  const { classroomId, lectureId } = useParams({
    from: '/_protected/_tsx/classroom/$classroomId/lectures/$lectureId',
  }) as { classroomId: string; lectureId: string };

  const { data: lecture, isLoading, error } = useLectureDetail(classroomId, lectureId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin h-8 w-8 text-amber-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-20">تعذر تحميل المحاضرة</div>
    );
  }

  if (!lecture) {
    return (
      <div className="text-white/60 text-center py-20">المحاضرة غير موجودة</div>
    );
  }

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <Link
        to="/_protected/_tsx/classroom/$classroomId/lectures/"
        params={{ classroomId }}
        className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 mb-6"
      >
        <ArrowRight size={16} />
        العودة لقائمة المحاضرات
      </Link>

      <h2 className="text-3xl font-bold text-white mb-4">{lecture.title}</h2>

      {lecture.description && (
        <p className="text-white/70 mb-6">{lecture.description}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lecture.videoUrl && (
          <div className="bg-black/30 rounded-2xl overflow-hidden">
            <video
              src={lecture.videoUrl}
              controls
              className="w-full aspect-video"
            />
            <div className="p-3 flex items-center gap-2 text-white/60 text-sm">
              <Video size={16} className="text-amber-400" />
              فيديو المحاضرة
            </div>
          </div>
        )}

        {lecture.documentUrl && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
            <FileText size={48} className="text-amber-400 mb-4" />
            <a
              href={lecture.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              تحميل المستند
            </a>
          </div>
        )}

        {!lecture.videoUrl && !lecture.documentUrl && (
          <div className="col-span-full text-white/60 text-center py-10">
            لا يوجد محتوى مضاف لهذه المحاضرة بعد
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureDetailPage;