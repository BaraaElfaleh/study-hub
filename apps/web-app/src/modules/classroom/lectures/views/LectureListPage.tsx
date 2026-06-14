// src/modules/classroom/lectures/pages/LectureListPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useLectures } from '../hooks/useLectures';
import { useAuthStore } from '../../../auth/store/authStore';
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Save,
  Video,
  FileText,
  Loader,
} from 'lucide-react';

const LectureListPage = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/lectures',
  }) as { classroomId: string };

  const {
    lectures,
    isLoading,
    error,
    createLecture,
    updateLecture,
    deleteLecture,
    isCreating,
    isUpdating,
    isDeleting,
  } = useLectures(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formVideo, setFormVideo] = useState('');
  const [formDoc, setFormDoc] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editVideo, setEditVideo] = useState('');
  const [editDoc, setEditDoc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    createLecture({
      title: formTitle.trim(),
      description: formDesc.trim() || undefined,
      videoUrl: formVideo.trim() || undefined,
      documentUrl: formDoc.trim() || undefined,
    });
    setFormTitle('');
    setFormDesc('');
    setFormVideo('');
    setFormDoc('');
    setShowForm(false);
  };

  const startEdit = (lec: any) => {
    setEditingId(lec.id);
    setEditTitle(lec.title);
    setEditDesc(lec.description || '');
    setEditVideo(lec.videoUrl || '');
    setEditDoc(lec.documentUrl || '');
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateLecture({
      id: editingId,
      data: {
        title: editTitle.trim(),
        description: editDesc.trim() || undefined,
        videoUrl: editVideo.trim() || undefined,
        documentUrl: editDoc.trim() || undefined,
      },
    });
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen size={24} className="text-amber-400" />
          المحاضرات
        </h2>
        {isTeacher && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
          >
            <Plus size={18} />
            إضافة محاضرة
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="عنوان المحاضرة"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <textarea
            placeholder="الوصف (اختياري)"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            rows={2}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <input
            type="url"
            placeholder="رابط الفيديو (اختياري)"
            value={formVideo}
            onChange={(e) => setFormVideo(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <input
            type="url"
            placeholder="رابط المستند (اختياري)"
            value={formDoc}
            onChange={(e) => setFormDoc(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-white/60 hover:bg-white/10 rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-6 py-2 rounded-xl font-medium disabled:opacity-50"
            >
              {isCreating ? 'جاري الإنشاء...' : 'إنشاء'}
            </button>
          </div>
        </form>
      )}

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin h-6 w-6 text-amber-400" />
        </div>
      )}
      {error && <p className="text-red-400 text-center">فشل تحميل المحاضرات</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {lectures.length === 0 && (
            <p className="text-white/60 text-center py-10">لا توجد محاضرات بعد</p>
          )}
          {lectures.map((lec) => (
            <div
              key={lec.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
            >
              {editingId === lec.id ? (
                <div className="space-y-3">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <input
                    type="url"
                    value={editVideo}
                    onChange={(e) => setEditVideo(e.target.value)}
                    placeholder="رابط الفيديو"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <input
                    type="url"
                    value={editDoc}
                    onChange={(e) => setEditDoc(e.target.value)}
                    placeholder="رابط المستند"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-white/60 hover:bg-white/10 rounded-lg"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={saveEdit}
                      disabled={isUpdating}
                      className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-4 py-1 rounded-lg flex items-center gap-1 disabled:opacity-50"
                    >
                      <Save size={16} /> حفظ
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg">{lec.title}</h3>
                    {isTeacher && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(lec)}
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                          title="تعديل"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteLecture(lec.id)}
                          disabled={isDeleting}
                          className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                  {lec.description && (
                    <p className="text-white/60 text-sm mt-2">{lec.description}</p>
                  )}
                  <div className="flex gap-4 mt-3 text-sm text-white/50">
                    {lec.videoUrl && (
                      <span className="flex items-center gap-1">
                        <Video size={16} className="text-amber-400" /> فيديو
                      </span>
                    )}
                    {lec.documentUrl && (
                      <span className="flex items-center gap-1">
                        <FileText size={16} className="text-amber-400" /> مستند
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureListPage;