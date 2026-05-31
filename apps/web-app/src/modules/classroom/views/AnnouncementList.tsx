import { useParams } from '@tanstack/react-router';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { Loader } from '../../../shared/components/ui/Loader';
import { Megaphone } from 'lucide-react';

const AnnouncementList = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/announcements' }) as { classroomId: string };
  const { data: announcements, isLoading, error } = useAnnouncements(classroomId);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل الإعلانات</p>;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* عنوان القسم */}
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Megaphone size={24} className="text-amber-400" />
          الإعلانات
        </h3>

        {announcements?.map((ann) => (
          <div
            key={ann.id}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                {ann.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-medium">{ann.author.name}</p>
                <p className="text-white/40 text-xs">{ann.createdAt}</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{ann.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{ann.body}</p>
          </div>
        ))}
        {(!announcements || announcements.length === 0) && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
            <Megaphone size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">لا توجد إعلانات بعد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;