// apps/web-app/src/modules/classroom/views/AnnouncementList.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { Loader } from '../../../shared/components/ui/Loader';
import { Megaphone, Plus } from 'lucide-react';
import { useAuthStore } from '../../../modules/auth/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';

const AnnouncementList = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/announcements',
  }) as { classroomId: string };

  const { data: announcements, isLoading, error } = useAnnouncements(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER';

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      classroomApi.createAnnouncement(classroomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classroom', classroomId, 'announcements'],
      });
      setShowForm(false);
      setNewTitle('');
      setNewContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newContent.trim()) {
      addMutation.mutate({
        title: newTitle.trim(),
        content: newContent.trim(),
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل الإعلانات</p>;

  return (
    <div
      className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16 rounded-2xl relative"
      dir="rtl"
    >
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone size={24} className="text-amber-400" />
            الإعلانات
          </h3>

          {isTeacher && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
            >
              <Plus size={18} />
              إضافة إعلان
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="عنوان الإعلان"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white"
                required
              />

              <textarea
                placeholder="نص الإعلان"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white min-h-30"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setNewTitle('');
                    setNewContent('');
                  }}
                  className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={addMutation.isPending}
                  className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-6 py-2 rounded-xl disabled:opacity-50"
                >
                  {addMutation.isPending ? 'جاري النشر...' : 'نشر'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {announcements?.map((ann) => {
          const authorName = `${ann.author?.firstName || ''} ${ann.author?.lastName || ''}`.trim();
          const authorInitial = ann.author?.firstName?.[0] || ann.author?.lastName?.[0] || 'م';

          return (
            <div
              key={ann.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                  {authorInitial}
                </div>

                <div>
                  <p className="text-white font-medium">{authorName}</p>
                  <p className="text-white/40 text-xs">{ann.createdAt}</p>
                </div>
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{ann.title}</h3>
              <p className="text-white/60 text-sm">{ann.content}</p>
            </div>
          );
        })}

        {!announcements?.length && !showForm && (
          <div className="text-center text-white/60 py-10">
            لا توجد إعلانات بعد
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;