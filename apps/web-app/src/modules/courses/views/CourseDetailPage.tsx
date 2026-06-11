import { useParams, Link } from '@tanstack/react-router';
import { useCourses } from '../hooks/useCourses';
import { Loader } from '../../../shared/components/ui/Loader';
import { ArrowLeft, BookOpen, User, Calendar, BarChart } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams({
    from: '/_protected/tsx/courses/$courseId',
  }) as { courseId: string };

  const { useCourseDetail } = useCourses();
  const { data: course, isLoading, error } = useCourseDetail(courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050530] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050530] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <p className="text-red-400 text-lg">فشل تحميل تفاصيل الدورة</p>
          <Link to="/tsx/courses" className="text-amber-400 mt-4 inline-block">
            العودة للدورات
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#050530] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">الدورة غير موجودة</p>
          <Link to="/tsx/courses" className="text-amber-400 mt-4 inline-block">
            تصفح الدورات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] px-4 py-8 md:py-16"
      dir="rtl"
    >
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/30">
          {/* أيقونة الدورة */}
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-400/20 to-amber-400/5 flex items-center justify-center mb-6">
            <BookOpen size={36} className="text-amber-400" />
          </div>

          {/* العنوان */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            {course.title}
          </h1>

          {/* الوصف */}
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
            {course.description}
          </p>

          {/* معلومات إضافية */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
           {course.teacher && (
  <div className="flex items-center gap-3 text-white/70">
    <User size={18} className="text-amber-400" />
    <span>{`${course.teacher.firstName || ''} ${course.teacher.lastName || ''}`}</span>
  </div>
)}
            <div className="flex items-center gap-3 text-white/70">
              <BarChart size={18} className="text-amber-400" />
              <span>
                {course.level === 'beginner'
                  ? 'مبتدئ'
                  : course.level === 'intermediate'
                    ? 'متوسط'
                    : 'متقدم'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Calendar size={18} className="text-amber-400" />
              <span>أُضيف {course.createdAt}</span>
            </div>
          </div>

          {/* السعر */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-amber-400 text-3xl font-bold">${course.price}</span>
            <span className="text-white/40 text-sm line-through">
              ${(course.price * 1.5).toFixed(0)}
            </span>
            <span className="bg-amber-400/20 text-amber-400 text-sm px-3 py-1 rounded-full">
              خصم 33%
            </span>
          </div>

          {/* زر التسجيل */}
          <Link
            to="/tsx/checkout/$course"
            params={{ course: course.id }}
            className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 flex items-center gap-2 text-lg w-fit"
          >
            سجّل الآن
          </Link>

          {/* رابط العودة */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              to="/tsx/courses"
              className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors duration-300 text-sm"
            >
              <ArrowLeft size={16} />
              العودة لجميع الدورات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;