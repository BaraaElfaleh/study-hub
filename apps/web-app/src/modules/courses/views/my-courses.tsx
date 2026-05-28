// src/modules/courses/views/MyCoursesPage.tsx
import { Link } from '@tanstack/react-router';
import {
  BookOpen,
  Play,
  ChevronLeft,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
// import { useAuthStore } from '../../auth/store/authStore';
import { mockCourses } from '../../../mock/data';

// بيانات وهمية لالتحاق المستخدم الحالي بكورسات مع تقدم معين
const enrolledCoursesData = [
  { courseId: 'course-001', progress: 65, lastAccessed: 'منذ 3 أيام' },
  { courseId: 'course-003', progress: 20, lastAccessed: 'منذ أسبوع' },
  { courseId: 'course-002', progress: 100, lastAccessed: 'منذ شهر' },
];

const MyCoursesPage = () => {
  // const { user } = useAuthStore();

  // فلترة الكورسات التي سجل فيها المستخدم (عبر mock enrollments)
  const enrolledCourses = enrolledCoursesData.map((enrollment) => {
    const course = mockCourses.find((c) => c.id === enrollment.courseId);
    return { ...course, ...enrollment };
  }).filter(Boolean);

  // إحصائيات عامة
  const totalEnrolled = enrolledCourses.length;
  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;
  const overallProgress = enrolledCourses.length
    ? Math.round(
        enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length
      )
    : 0;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038]"
      dir="rtl"
    >
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-400/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            كورساتي
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">
            استكمل رحلتك التعليمية من حيث توقفت. كل دورة تملكها تظهر هنا مع تقدمك الحالي.
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
            <BookOpen size={32} className="text-amber-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{totalEnrolled}</div>
            <div className="text-white/60 text-sm mt-1">كورسات مسجل بها</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
            <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{completedCount}</div>
            <div className="text-white/60 text-sm mt-1">مكتملة</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-amber-400/20 transition-all">
            <TrendingUp size={32} className="text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white">{overallProgress}%</div>
            <div className="text-white/60 text-sm mt-1">متوسط التقدم</div>
          </div>
        </div>

        {/* قائمة الكورسات */}
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/70 text-lg">لم تقم بالتسجيل في أي كورس بعد.</p>
            <Link
              to="/tsx/courses"
              className="text-amber-400 hover:text-amber-300 mt-4 inline-block"
            >
              تصفح الكورسات المتاحة
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/20 hover:-translate-y-1"
              >
                {/* أيقونة الدورة */}
                <div className="w-full h-40 bg-gradient-to-br from-blue-500/20 to-amber-400/20 rounded-xl mb-4 flex items-center justify-center">
                  <BookOpen size={48} className="text-amber-400/60" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-white/50 text-sm mb-4">المدرس: {course.instructorName}</p>

                {/* شريط التقدم */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>التقدم</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100
                          ? 'bg-green-400'
                          : 'bg-gradient-to-r from-amber-400 to-amber-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-white/40 text-xs mb-4">
                  آخر دخول: {course.lastAccessed}
                </p>

                {/* زر المتابعة */}
                <Link
                  to="/tsx/classroom/$classroomId/lectures"
                  params={{ classroomId: course.id } as any}
                  className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] font-medium py-2 px-4 rounded-xl transition-all duration-300 w-full justify-center"
                >
                  {course.progress === 100 ? (
                    <>
                      <Play size={16} />
                      إعادة المشاهدة
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      متابعة التعلم
                    </>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* العودة للدورات */}
        <div className="text-center mt-12">
          <Link
            to="/tsx/courses"
            className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors duration-300 text-sm"
          >
            <ChevronLeft size={16} />
            تصفح جميع الكورسات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;