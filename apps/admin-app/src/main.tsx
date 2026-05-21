import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import '../../../packages/ui/src/style/global.css'


import { routeTree } from './routeTree.gen'


const router = createRouter({ routeTree })


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 4. تشغيل التطبيق
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)