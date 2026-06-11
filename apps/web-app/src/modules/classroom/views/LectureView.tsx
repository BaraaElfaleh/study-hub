import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useLectures } from '../hooks/useLectures';
import { useClassroomStore } from '../store/classroomStore';
import { Loader } from '../../../shared/components/ui/Loader';
import { BookOpen, Plus, Video, Edit3, Trash2, Save } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';
import type { Lecture } from '../../../shared/types/classroom';

const LectureView = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/lectures' }) as { classroomId: string };
  const { lectures, isLoading, error, createLecture, updateLecture, deleteLecture, isCreating, isUpdating, isDeleting } = useLectures(classroomId);
  const { currentLectureId } = useClassroomStore();
  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER';

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!newTitle.trim()) return; createLecture({ title: newTitle.trim(), videoUrl: newVideoUrl.trim() || undefined, documentUrl: undefined }); setNewTitle(''); setNewVideoUrl(''); setShowAddForm(false); };
  const handleEditStart = (lec: Lecture) => { setEditingId(lec.id); setEditTitle(lec.title); setEditVideoUrl(lec.videoUrl || ''); };
  const handleEditSave = () => { if (!editingId || !editTitle.trim()) return; updateLecture({ lectureId: editingId, data: { title: editTitle.trim(), videoUrl: editVideoUrl.trim() || undefined } }); setEditingId(null); };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400">فشل تحميل المحاضرات</p>;

  return (
    <div className="min-h-full bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] p-6 rounded-2xl relative overflow-hidden" dir="rtl">
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between"><h3 className="text-2xl font-bold text-white"><BookOpen size={24} className="text-amber-400 inline ml-2" />المحاضرات</h3>{isTeacher && !showAddForm && <button onClick={() => setShowAddForm(true)} className="bg-amber-400 px-4 py-2 rounded-xl"><Plus size={18} />إضافة</button>}</div>
        {showAddForm && (<form onSubmit={handleAddSubmit} className="bg-white/5 p-6 rounded-2xl space-y-4"><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="العنوان" className="w-full bg-white/10 p-3 rounded-xl text-white" /><input value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} placeholder="رابط الفيديو" className="w-full bg-white/10 p-3 rounded-xl text-white" /><div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="text-white/60">إلغاء</button><button type="submit" disabled={isCreating} className="bg-amber-400 px-4 py-2 rounded-xl disabled:opacity-50">{isCreating ? '...' : 'إضافة'}</button></div></form>)}
        {lectures?.map((lec) => (
          <div key={lec.id} className={`p-4 rounded-xl border ${currentLectureId === lec.id ? 'bg-amber-400/10 border-amber-400/40' : 'bg-white/5 border-white/10'}`}>
            {editingId === lec.id ? (<><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-white/10 p-2 rounded-xl text-white mb-2" /><input value={editVideoUrl} onChange={(e) => setEditVideoUrl(e.target.value)} className="w-full bg-white/10 p-2 rounded-xl text-white mb-2" /><div className="flex justify-end gap-3"><button onClick={() => setEditingId(null)} className="text-white/60">إلغاء</button><button onClick={handleEditSave} disabled={isUpdating} className="bg-amber-400 px-4 py-2 rounded-xl"><Save size={16} /></button></div></>) : (<><div className="flex justify-between"><h3 className="text-white font-semibold">{lec.title}</h3>{isTeacher && <div className="flex gap-2"><button onClick={() => handleEditStart(lec)} className="text-amber-400"><Edit3 size={18} /></button><button onClick={() => deleteLecture(lec.id)} disabled={isDeleting} className="text-red-400"><Trash2 size={18} /></button></div>}</div>{lec.videoUrl && <p className="text-sm text-white/60 mt-1"><Video size={14} /> فيديو متوفر</p>}<p className="text-xs text-white/40 mt-2">{new Date(lec.createdAt).toLocaleDateString('ar-SA')}</p></>)}
          </div>
        ))}
        {!lectures?.length && <p className="text-white/60 text-center py-10">لا توجد محاضرات</p>}
      </div>
    </div>
  );
};

export default LectureView;