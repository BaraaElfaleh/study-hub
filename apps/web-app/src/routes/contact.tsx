import { createFileRoute } from '@tanstack/react-router'
import ContactPage from '../pages/ContactPage' // أو المسار المناسب

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})