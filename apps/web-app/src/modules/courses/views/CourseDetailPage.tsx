import { useParams } from '@tanstack/react-router';
import { useCourses } from '../hooks/useCourses';
import { Button } from '../../shared/components/ui/Button';
import { Loader } from '../../shared/components/ui/Loader';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams({ from: '/courses/$courseId' } as any);
  const { useCourseDetail, enrollInCourse, enrollState } = useCourses();
  const { data: course, isLoading, error } = useCourseDetail(courseId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16">
      {/* تأثيرات خلفية (نقاط مضيئة وتوهج) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <p className="text-red-400 text-lg">فشل تحميل تفاصيل الدورة</p>
            <Link to="/courses" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
              العودة للدورات
            </Link>
          </div>
        ) : !course ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">الدورة غير موجودة</p>
            <Link to="/courses" className="text-amber-400 hover:text-amber-300 mt-4 inline-block">
              تصفح الدورات
            </Link>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/30">
            {/* اسم الدورة */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
              {course.title}
            </h1>

            {/* وصف الدورة */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              {course.description}
            </p>

            {/* السعر */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-amber-400 text-3xl font-bold">{course.price} $</span>
              <span className="text-white/40 text-sm line-through">{course.price ? course.price * 1.5 : 0} $</span>
              <span className="bg-amber-400/20 text-amber-400 text-sm px-3 py-1 rounded-full">خصم 33%</span>
            </div>

            {/* معلومات إضافية (إن وجدت) */}
            {course.instructorName && (
              <div className="text-white/60 text-sm mb-4">
                المدرب: <span className="text-white">{course.instructorName}</span>
              </div>
            )}

            {/* زر التسجيل */}
            <div className="mt-8">
              <Button
                onClick={() => enrollInCourse(course.id)}
                disabled={enrollState.isPending}
                className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
              >
                {enrollState.isPending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-[#050530]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري التسجيل...
                  </>
                ) : (
                  <>
                    <Sparkles size={22} />
                    سجّل الآن
                  </>
                )}
              </Button>
              {enrollState.error && (
                <p className="text-red-400 mt-3 text-sm">فشل التسجيل، حاول مرة أخرى</p>
              )}
            </div>

            {/* رابط العودة */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <Link to="/courses" className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors duration-300 text-sm">
                <ArrowRight size={16} className="transform rotate-180" />
                العودة لجميع الدورات
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;