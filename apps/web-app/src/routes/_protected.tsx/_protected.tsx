// src/routes/_protected.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

/**
 * هذا الملف يمثل مساراً مخفياً (Layout Route) يعمل كحارس للمصادقة.
 * منطق التحقق من تسجيل الدخول موجود بالكامل داخل `beforeLoad`.
 * المكون هنا بسيط جداً: يكتفي بعرض الصفحات الفرعية.
 */

export const Route = createFileRoute('/_protected/tsx/_protected')({
  // ======== Middleware: التحقق من المصادقة ========
  beforeLoad: async ({ context, location }) => {
    // `context.auth` يفترض أنك قمت بحقنه في أعلى شجرة التوجيه (مثلاً عبر createRootRoute)
    // يحتوي على { isAuthenticated: boolean, user: User | null }
    const { isAuthenticated } = context.auth

    if (!isAuthenticated) {
      // إعادة توجيه إلى صفحة الدخول مع حفظ مسار العودة في search params
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href, // يحفظ المسار الحالي للعودة لاحقاً
        },
      })
    }
  },

  // ======== طبقة العرض: مجرد Outlet ========
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})