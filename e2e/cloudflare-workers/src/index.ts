import { createTestServerAdapter } from '@e2e/shared-server';

const app = createTestServerAdapter(globalThis['WORKER_PATH'] || '/');

self.addEventListener('fetch', app);
