// src/modules/courses/pages/teacher/TeacherCoursesPage.tsx
import { useTeacherCourses } from '../../hooks/useTeacherCourses';
import { Link } from '@tanstack/react-router';
import { Loader } from '../../../../shared/components/ui/Loader';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

const TeacherCoursesPage = () => {
  const { courses, isLoading, deleteCourse } = useTeacherCourses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white">كورساتي (كمعلم)</h1>
          <Link
            to="/teacher/courses/create"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-2 px-4 rounded-xl"
          >
            <Plus size={18} /> كورس جديد
          </Link>
        </div>

        {isLoading && <div className="flex justify-center"><Loader /></div>}

        {courses && courses.length === 0 && (
          <p className="text-white/70 text-center">لا توجد كورسات بعد</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map(course => (
            <div key={course.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white">{course.title}</h2>
              <p className="text-white/60 text-sm mt-2 line-clamp-3">{course.description}</p>
              <div className="flex gap-3 mt-4">
                <Link
                  to="/teacher/courses/$courseId/edit"
                  params={{ courseId: course.id }}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
                >
                  <Pencil size={16} /> تعديل
                </Link>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} /> حذف
                </button>
                <Link
                  to="/teacher/courses/$courseId/students"
                  params={{ courseId: course.id }}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                >
                  <Users size={16} /> الطلاب
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursesPage;