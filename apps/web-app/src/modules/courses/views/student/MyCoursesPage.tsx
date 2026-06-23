// src/modules/courses/pages/student/MyCoursesPage.tsx
import { Link } from '@tanstack/react-router';
import { useEnrolledCourses } from '../../hooks/useEnrolledCourses';
import { Loader } from '../../../../shared/components/ui/Loader';
import { BookOpen } from 'lucide-react';

const MyCoursesPage = () => {
  const { data: courses, isLoading, error } = useEnrolledCourses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">كورساتي</h1>

        {isLoading && (
          <div className="flex justify-center"><Loader /></div>
        )}
        {error && (
          <div className="text-red-400 text-center">فشل تحميل الكورسات</div>
        )}

        {!isLoading && !error && courses?.length === 0 && (
          <div className="text-center text-white/70">
            <BookOpen size={48} className="mx-auto text-amber-400 mb-4" />
            <p>لم تسجل في أي كورس بعد.</p>
            <Link to="/courses" className="text-amber-400 mt-2 inline-block">تصفح الكورسات</Link>
          </div>
        )}

        {courses && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-amber-400/20 transition-all">
                <h2 className="text-xl font-bold text-white">{course.title}</h2>
                <p className="text-white/60 text-sm mt-2 line-clamp-2">{course.description}</p>
                <Link
                  to="/courses/$courseId"
                  params={{ courseId: course.id }}
                  className="text-amber-400 mt-4 inline-block"
                >
                  متابعة
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;