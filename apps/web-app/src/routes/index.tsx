// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import  HomePage  from '../pages/Home'; // أو '@/pages/Home'

export const Route = createFileRoute('/')({
  component: HomePage,
});