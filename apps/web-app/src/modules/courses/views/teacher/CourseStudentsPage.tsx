// src/modules/courses/pages/teacher/CourseStudentsPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useTeacherCourses } from '../../hooks/useTeacherCourses';

const CourseStudentsPage = () => {
  const { courseId } = useParams({ from: '/_protected/_tsx/teacher/courses/$courseId/students' }) as { courseId: string };
  const { enrollStudent} = useTeacherCourses();
  const [studentId, setStudentId] = useState('');

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    enrollStudent({ courseId, body: { studentId } });
    setStudentId('');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">إدارة طلاب الكورس</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <form onSubmit={handleEnroll} className="flex gap-2">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="معرف الطالب"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
            />
            <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-6 rounded-xl">
              تسجيل
            </button>
          </form>
          {/* قائمة الطلاب ستأتي لاحقاً من API منفصل إذا توفر */}
          <p className="text-white/50 text-sm">قائمة الطلاب ستظهر هنا عند توفرها من الخادم.</p>
        </div>
      </div>
    </div>
  );
};

export default CourseStudentsPage;