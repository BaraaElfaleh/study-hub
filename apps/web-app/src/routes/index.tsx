// src/routes/index.tsx
    import { createFileRoute } from '@tanstack/react-router';

    export const Route = createFileRoute('/')({
      component: () => <h1>Hello ClassRoom</h1>,
    });
