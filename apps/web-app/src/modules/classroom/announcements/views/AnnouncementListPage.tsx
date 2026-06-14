// src/modules/classroom/announcements/views/AnnouncementListPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { useAuthStore } from '../../../auth/store/authStore';
import { Megaphone, Plus, Trash2, Edit3, Loader } from 'lucide-react';

const AnnouncementListPage = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/announcements',
  }) as { classroomId: string };

  const {
    data: announcements,
    isLoading,
    error,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    isCreating,
    isUpdating,
  } = useAnnouncements(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    if (editingId) {
      updateAnnouncement({
        id: editingId,
        data: { title: newTitle.trim(), content: newContent.trim() },
      });
    } else {
      createAnnouncement({ title: newTitle.trim(), content: newContent.trim() });
    }
    resetForm();
  };

  const startEdit = (announcement: any) => {
    setEditingId(announcement.id);
    setNewTitle(announcement.title);
    setNewContent(announcement.content);
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Megaphone size={24} className="text-amber-400" />
          الإعلانات
        </h2>
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

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <input
            type="text"
            placeholder="عنوان الإعلان"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30"
            required
          />
          <textarea
            placeholder="نص الإعلان"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30"
            required
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={resetForm} className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl">
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-6 py-2 rounded-xl font-medium disabled:opacity-50"
            >
              {editingId ? (isUpdating ? 'جاري الحفظ...' : 'حفظ التعديلات') : isCreating ? 'جاري النشر...' : 'نشر'}
            </button>
          </div>
        </form>
      )}

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin h-6 w-6 text-amber-400" />
        </div>
      )}
      {error && <p className="text-red-400 text-center">فشل تحميل الإعلانات</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {announcements.length === 0 && (
            <p className="text-white/60 text-center py-10">لا توجد إعلانات بعد</p>
          )}
          {announcements.map((ann) => {
            const authorName = `${ann.author?.firstName || ''} ${ann.author?.lastName || ''}`.trim();
            const authorInitial = ann.author?.firstName?.[0] || 'م';

            return (
              <div key={ann.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    {authorInitial}
                  </div>
                  <div>
                    <p className="text-white font-medium">{authorName || 'مستخدم'}</p>
                    <p className="text-white/40 text-xs">{ann.createdAt}</p>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{ann.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{ann.content}</p>
                {isTeacher && (
                  <div className="mt-3 flex justify-end gap-2">
                    <button onClick={() => startEdit(ann)} className="text-amber-400 hover:text-amber-300 transition-colors" title="تعديل">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => deleteAnnouncement(ann.id)} className="text-red-400 hover:text-red-300 transition-colors" title="حذف">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnnouncementListPage;