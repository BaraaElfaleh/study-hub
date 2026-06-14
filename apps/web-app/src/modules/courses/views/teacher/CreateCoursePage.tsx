// src/modules/courses/pages/teacher/CreateCoursePage.tsx
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTeacherCourses } from '../../hooks/useTeacherCourses';
import { ArrowRight } from 'lucide-react';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { createCourse, isCreating } = useTeacherCourses();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourse({ title, description });
    navigate({ to: '/tsx/teacher/courses' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">إنشاء كورس جديد</h1>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان الكورس"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="وصف الكورس"
            rows={5}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isCreating ? 'جارٍ الإنشاء...' : 'إنشاء'} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;