// src/modules/courses/pages/teacher/EditCoursePage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useCourseDetail } from '../../hooks/useCourseDetail';
import { useTeacherCourses } from '../../hooks/useTeacherCourses';
import { Loader } from '../../../../shared/components/ui/Loader';

const EditCoursePage = () => {
  const { courseId } = useParams({ from: '/_protected/tsx/teacher/courses/$courseId/edit' }) as { courseId: string };
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourseDetail(courseId);
  const { updateCourse, isUpdating } = useTeacherCourses();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse({ id: courseId, data: { title, description } });
    navigate({ to: '/tsx/teacher/courses' });
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><Loader /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">تعديل الكورس</h1>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white" />
          <button type="submit" disabled={isUpdating} className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 rounded-xl disabled:opacity-50">
            {isUpdating ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;