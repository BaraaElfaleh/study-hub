import { useParams } from '@tanstack/react-router';
import { useAnnouncements } from '../hooks/useAnnouncements';
import {Loader} from '../../../shared/components/ui/Loader';

const AnnouncementList = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/$classroomId/' });
  const { data: announcements, isLoading, error } = useAnnouncements(classroomId);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل الإعلانات</p>;

  return (
    <div className="space-y-6">
      {announcements?.map((ann) => (
        <div
          key={ann.id}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
              {ann.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{ann.author.name}</p>
              <p className="text-white/40 text-xs">{ann.createdAt}</p>
            </div>
          </div>
          <h3 className="text-white font-bold text-lg">{ann.title}</h3>
          <p className="text-white/60 mt-2">{ann.body}</p>
        </div>
      ))}
      {(!announcements || announcements.length === 0) && (
        <p className="text-white/60 text-center py-8">لا توجد إعلانات بعد</p>
      )}
    </div>
  );
};

export default AnnouncementList;