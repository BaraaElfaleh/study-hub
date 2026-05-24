// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // إضافة هذه
import { routeTree } from './routeTree.gen';
import '../../../packages/ui/src/style/global.css';

// 1. إنشاء الـ QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // تحسين الأداء: لا تعيد الجلب عند العودة للنافذة
      retry: 1,                    // محاولة واحدة فقط عند فشل الطلب
    },
  },
});

// إعداد الراوتر
const router = createRouter({ 
  routeTree,
  context: { queryClient } // 2. تمرير الـ queryClient للـ context الخاص بالراوتر
});

// تسجيل الراوتر لـ TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 3. تغليف التطبيق بالـ Provider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);