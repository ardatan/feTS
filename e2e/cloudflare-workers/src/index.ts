import { createTestServerAdapter } from '@e2e/shared-server';

const app = createTestServerAdapter((globalThis as any)['WORKER_PATH'] || '/');

self.addEventListener('fetch', app);
