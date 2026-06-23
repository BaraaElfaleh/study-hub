// src/modules/payments/views/CheckoutPage.tsx
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import CheckoutForm from './CheckoutForm';
import { useCourseDetail } from '../../courses/hooks/useCourseDetail';
import  {Loader } from '../../../shared/components/ui/Loader';

const CheckoutPage = () => {
  const { courseId } = useParams({
    from: '/_protected/checkout/$courseId',
  }) as { courseId: string };

  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourseDetail(courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#050530] to-[#040646] flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-lg">الدورة غير موجودة أو حدث خطأ</p>
        <Link to="/courses" className="text-amber-400">العودة للدورات</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050530] to-[#040646] py-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">إتمام الطلب</h1>
          <p className="text-white/50">أنت على بعد خطوة واحدة من بدء رحلتك التعليمية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm
              courseId={course.id}
              courseName={course.title}
              coursePrice={course.price ?? 0}
              onSuccess={() => navigate({ to: '/payments/history' })}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0a0a4a]/50 border border-white/10 p-6 rounded-3xl backdrop-blur-sm sticky top-24">
              <h3 className="text-white font-bold mb-4">ملخص الدورة</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-white/70">
                  <span>{course.title}</span>
                  <span>{course.price} ريال</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-white">
                  <span>الإجمالي</span>
                  <span className="text-amber-400">{course.price} ريال</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;