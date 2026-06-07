// apps/admin-app/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { useAuthStore } from './modules/auth/store/authStore';
import '../../../packages/ui/src/style/global.css'; // استيراد ملف التنسيق المحلي

// 1. عميل TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 2. تعريف السياق الموسع لـ TypeScript (مرة واحدة فقط)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    context: {
      queryClient: typeof queryClient;
      auth: {
        isAuthenticated: boolean;
        user: ReturnType<typeof useAuthStore.getState>['user'];
      };
    };
  }
}

// 3. إنشاء الراوتر مع سياق auth
const router = createRouter({
  routeTree,
  context: {
    queryClient,
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

// 4. مزامنة Zustand مع TanStack Router
useAuthStore.subscribe(() => {
  router.invalidate();
});

// 5. تشغيل التطبيق
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);