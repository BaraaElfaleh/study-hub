// src/modules/classroom/views/ManageClassroomPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useClassroomManage } from '../hooks/useClassroomManage';
import { Loader } from '../../../shared/components/ui/Loader';
import { Users, Trash2, UserPlus, Save, Settings } from 'lucide-react';

const ManageClassroomPage = () => {
 const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/manage' }) as { classroomId: string };;

  const { students, isLoading, removeStudent, addStudent, updateClassroom, isAdding, isRemoving } = useClassroomManage(classroomId);
  const [newEmail, setNewEmail] = useState('');
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [editing, setEditing] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail.trim()) {
      addStudent(newEmail.trim());
      setNewEmail('');
    }
  };

  const handleUpdateClass = (e: React.FormEvent) => {
    e.preventDefault();
    updateClassroom({ title: className, description: classDescription });
    setEditing(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-full bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] p-6 md:p-10 rounded-2xl relative overflow-hidden" dir="rtl">
      <div className="relative z-10 space-y-8 text-right">
        <h2 className="text-3xl font-bold text-white">إدارة الفصل</h2>

        {/* بطاقة تعديل بيانات الفصل */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <Settings size={24} className="text-amber-400" />
            إعدادات الفصل
          </div>
          {editing ? (
            <form onSubmit={handleUpdateClass} className="space-y-4">
              <input
                type="text"
                placeholder="اسم الفصل"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50"
              />
              <textarea
                placeholder="وصف الفصل"
                value={classDescription}
                onChange={(e) => setClassDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 min-h-25"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-6 py-2 rounded-xl transition-all">
                  <Save size={16} /> حفظ
                </button>
                <button type="button" onClick={() => setEditing(false)} className="px-6 py-2 rounded-xl text-white/60 hover:bg-white/10 transition-all">إلغاء</button>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-white/80">اسم الفصل: <span className="text-amber-400">فصل React (course-001)</span></p>
              <p className="text-white/80 mt-2">الوصف: تعلم React من الصفر إلى الاحتراف</p>
              <button onClick={() => setEditing(true)} className="mt-4 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-xl hover:bg-amber-400/20 transition-all">تعديل</button>
            </div>
          )}
        </div>

        {/* إدارة الطلاب */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users size={24} className="text-amber-400" />
              الطلاب المسجلون ({students?.length ?? 0})
            </h3>
          </div>

          <form onSubmit={handleAddStudent} className="flex gap-3 mb-6">
            <input
              type="email"
              placeholder="أدخل بريد الطالب الإلكتروني"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50"
            />
            <button type="submit" disabled={isAdding || !newEmail.trim()} className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all disabled:opacity-50">
              <UserPlus size={18} />
              إضافة
            </button>
          </form>

          <div className="space-y-3">
            {students?.map((student) => (
              <div key={student.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div>
                  <p className="text-white font-medium">{student.name}</p>
                  <p className="text-white/60 text-sm">{student.email}</p>
                </div>
                <button
                  onClick={() => removeStudent(student.id)}
                  disabled={isRemoving}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClassroomPage;