// src/modules/classroom/enrollments/pages/EnrollmentManagementPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useCourseEnrollments } from '../hooks/useCourseEnrollments';
import { useAuthStore } from '../../../auth/store/authStore';
import { Users, UserPlus, UserMinus, Loader } from 'lucide-react';

const EnrollmentManagementPage = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/enrollments',
  }) as { classroomId: string };

  const { students, isLoading, error, enrollStudent, unenrollStudent, isEnrolling, isUnenrolling } =
    useCourseEnrollments(classroomId);
  const user = useAuthStore((s) => s.user);
  const isTeacherOrAdmin = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  const [newStudentId, setNewStudentId] = useState('');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentId.trim()) return;
    enrollStudent(newStudentId.trim());
    setNewStudentId('');
  };

  if (!isTeacherOrAdmin) {
    return (
      <div className="p-10 text-white/60 text-center">ليس لديك صلاحية لإدارة التسجيلات</div>
    );
  }

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Users size={24} className="text-amber-400" />
        إدارة التسجيلات
      </h2>

      {/* نموذج تسجيل طالب جديد */}
      <form onSubmit={handleEnroll} className="bg-white/5 p-4 rounded-2xl flex gap-2 mb-6">
        <input
          type="text"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
          placeholder="معرف الطالب (ID)"
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white"
          required
        />
        <button
          type="submit"
          disabled={isEnrolling}
          className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl flex items-center gap-1 disabled:opacity-50"
        >
          <UserPlus size={18} />
          {isEnrolling ? 'جاري التسجيل...' : 'تسجيل'}
        </button>
      </form>

      {/* قائمة المسجلين */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin text-amber-400" size={24} />
        </div>
      )}
      {error && <p className="text-red-400 text-center">فشل تحميل قائمة الطلاب</p>}

      {students && students.length === 0 && !isLoading && (
        <p className="text-white/60 text-center py-10">لم يسجل أي طالب بعد</p>
      )}

      {students && students.length > 0 && (
        <div className="space-y-2">
          {students.map((s: any) => (
            <div
              key={s.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
            >
              <span className="text-white">{s.studentId}</span>
              <button
                onClick={() => unenrollStudent(s.studentId)}
                disabled={isUnenrolling}
                className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                title="إلغاء التسجيل"
              >
                <UserMinus size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentManagementPage;