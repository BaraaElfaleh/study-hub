import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useLectures } from '../hooks/useLectures';
import { useClassroomStore } from '../store/classroomStore';
import { Loader } from '../../../shared/components/ui/Loader';
import { BookOpen, Plus, Video, Edit3, Trash2, Save } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';

const LectureView = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/lectures',
  }) as { classroomId: string };

  const {
    data: lectures,
    isLoading,
    error,
    addLecture,
    isAdding,
    updateLecture,
    isUpdating,
    deleteLecture,
    isDeleting,
  } = useLectures(classroomId);

  const { currentLectureId} = useClassroomStore();
  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'teacher';

  // حالة الإضافة
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newOrder, setNewOrder] = useState(1);

  // حالة التعديل
  const [editingLectureId, setEditingLectureId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editOrder, setEditOrder] = useState(1);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addLecture({
        title: newTitle.trim(),
        video_url: newVideoUrl.trim() || undefined,
        order: newOrder,
      });
      setNewTitle('');
      setNewVideoUrl('');
      setNewOrder(1);
      setShowAddForm(false);
    }
  };

  const handleEditStart = (lecture: any) => {
    setEditingLectureId(lecture.id);
    setEditTitle(lecture.title);
    setEditVideoUrl(lecture.videoUrl || '');
    setEditOrder(lecture.order);
  };

  const handleEditCancel = () => {
    setEditingLectureId(null);
  };

  const handleEditSave = () => {
    if (editingLectureId && editTitle.trim()) {
      updateLecture(editingLectureId, {
        title: editTitle.trim(),
        videoUrl: editVideoUrl.trim() || undefined,
        order: editOrder,
      });
      setEditingLectureId(null);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل المحاضرات</p>;

  return (
    <div className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 rounded-2xl relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen size={24} className="text-amber-400" />
            المحاضرات
          </h3>
          {isTeacher && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
            >
              <Plus size={18} />
              إضافة محاضرة
            </button>
          )}
        </div>

        {/* نموذج إضافة محاضرة */}
        {showAddForm && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <input type="text" placeholder="عنوان المحاضرة" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all" required />
            <input type="url" placeholder="رابط الفيديو (اختياري)" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all" />
            <input type="number" placeholder="الترتيب" value={newOrder} onChange={(e) => setNewOrder(Number(e.target.value))} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all" min={1} />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">إلغاء</button>
              <button onClick={handleAddSubmit} disabled={isAdding || !newTitle.trim()} className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-6 py-2 rounded-xl transition-all disabled:opacity-50">
                {isAdding ? 'جاري الإضافة...' : 'إضافة'}
              </button>
            </div>
          </div>
        )}

        {/* قائمة المحاضرات */}
        {lectures?.map((lecture) => (
          <div
            key={lecture.id}
            className={`p-4 rounded-xl border transition-all ${
              currentLectureId === lecture.id
                ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {editingLectureId === lecture.id ? (
              // وضع التعديل
              <div className="space-y-4">
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50" />
                <input type="url" value={editVideoUrl} onChange={(e) => setEditVideoUrl(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50" />
                <input type="number" value={editOrder} onChange={(e) => setEditOrder(Number(e.target.value))} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400/50" min={1} />
                <div className="flex justify-end gap-3">
                  <button onClick={handleEditCancel} className="px-4 py-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">إلغاء</button>
                  <button onClick={handleEditSave} disabled={isUpdating} className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-6 py-2 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2">
                    <Save size={16} />
                    {isUpdating ? 'جاري الحفظ...' : 'حفظ'}
                  </button>
                </div>
              </div>
            ) : (
              // عرض عادي
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{lecture.title}</h3>
                  {isTeacher && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditStart(lecture)} className="text-amber-400 hover:text-amber-300 transition-colors" title="تعديل">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => deleteLecture(lecture.id)} disabled={isDeleting} className="text-red-400 hover:text-red-300 transition-colors" title="حذف">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
                {lecture.videoUrl && (
                  <p className="text-sm opacity-70 mt-1 flex items-center gap-1">
                    <Video size={14} /> فيديو تعليمي
                  </p>
                )}
                <p className="text-xs text-white/40 mt-2">الترتيب: {lecture.order}</p>
              </>
            )}
          </div>
        ))}
        {!lectures?.length && !showAddForm && (
          <p className="text-white/60 text-center py-10">لا توجد محاضرات بعد</p>
        )}
      </div>
    </div>
  );
};

export default LectureView;