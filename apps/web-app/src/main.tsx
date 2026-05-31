// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './modules/auth/store/authStore'; // استيراد مخزن Zustand
import { routeTree } from './routeTree.gen';
import '../../../packages/ui/src/style/global.css';

// 1. إنشاء الـ QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 2. إعداد الراوتر مع context يحتوي على queryClient و auth
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // ✅ context.auth: خاصية ديناميكية تعكس حالة المصادقة من Zustand
    auth: {
      get isAuthenticated() {
        return useAuthStore.getState().isAuthenticated;
      },
      get user() {
        return useAuthStore.getState().user;
      },
    },
  },
});

// 3. مزامنة Zustand مع TanStack Router
// عند تغير isAuthenticated، نخبر TanStack Router بإعادة التحقق من الحماية
useAuthStore.subscribe(() => {
  router.invalidate();
});

// تسجيل الراوتر لـ TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);