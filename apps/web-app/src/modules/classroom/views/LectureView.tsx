import { useParams } from '@tanstack/react-router';
import { useLectures } from '../hooks/useLectures';
import { useClassroomStore } from '../store/classroomStore';
import {Loader} from '../../shared/components/ui/Loader';

const LectureView = () => {
  const { classroomId } = useParams({ from: '/_protected/classroom/$classroomId' });
  const { data: lectures, isLoading, error } = useLectures(classroomId);
  const { currentLectureId, setCurrentLectureId } = useClassroomStore();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل المحاضرات</p>;
  if (!lectures?.length) return <p className="text-white/60">لا توجد محاضرات بعد</p>;

  return (
    <div className="space-y-4">
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          onClick={() => setCurrentLectureId(lecture.id)}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            currentLectureId === lecture.id
              ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
          }`}
        >
          <h3 className="font-semibold">{lecture.title}</h3>
          {lecture.videoUrl && (
            <p className="text-sm opacity-70 mt-1">فيديو تعليمي</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LectureView;