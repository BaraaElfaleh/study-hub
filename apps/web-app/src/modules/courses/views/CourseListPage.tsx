/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCourses } from '../hooks/useCourses';
import { useCourseStore } from '../store/courseStore';
import { Button } from '../../../shared/components/ui/Button';
import { Loader } from '../../../shared/components/ui/Loader';
import { Link } from '@tanstack/react-router';
import { Search, Filter } from 'lucide-react';

const CourseListPage = () => {
  const { courses, isLoadingCourses, coursesError } = useCourses();
  const { filters, setSearch, setLevel } = useCourseStore();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16" dir="rtl">
      {/* تأثير توهج خلفي خفيف */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            الدورات المتاحة
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">
            اختر من بين عشرات الكورسات المصممة بعناية لتنقلك إلى المستوى الاحترافي
          </p>
        </div>

        {/* قسم الفلاتر */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-center">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
            />
          </div>
          <div className="relative w-full md:w-48">
            <Filter size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            <select
              value={filters.level || ''}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white appearance-none focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all duration-300 text-right"
              dir="rtl"
            >
              <option value="" className="bg-[#050530]">جميع المستويات</option>
              <option value="beginner" className="bg-[#050530]">مبتدئ</option>
              <option value="intermediate" className="bg-[#050530]">متوسط</option>
              <option value="advanced" className="bg-[#050530]">متقدم</option>
            </select>
          </div>
        </div>

        {/* حالات التحميل والخطأ */}
        {isLoadingCourses && (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        )}
        {coursesError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center max-w-md mx-auto">
            <p className="text-red-400">حدث خطأ في تحميل الدورات</p>
          </div>
        )}

        {/* شبكة البطاقات */}
        {!isLoadingCourses && !coursesError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <div
                key={course.id}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:shadow-lg hover:shadow-amber-400/5 hover:-translate-y-1"
              >
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {course.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-amber-400 font-bold text-lg">{course.price} $</span>
                  <Link
                    to="/tsx/courses/$courseId"
                     
                    params={{ courseId: course.id } as any}
                    className="inline-block"
                  >
                    <Button className="bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] font-medium py-2 px-4 rounded-xl transition-all duration-300">
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* رسالة في حالة عدم وجود دورات */}
        {!isLoadingCourses && !coursesError && courses?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">لا توجد دورات تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListPage;