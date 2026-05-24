// src/routes/login.tsx
import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../modules/auth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});