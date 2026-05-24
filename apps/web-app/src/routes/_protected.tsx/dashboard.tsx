// src/routes/_protected/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/tsx/dashboard')({
  component: h1 => <h1>Hello "/_protected/tsx/dashboard"!</h1>,
});