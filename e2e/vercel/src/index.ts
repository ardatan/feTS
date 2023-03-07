import { createTestServerAdapter } from '@e2e/shared-server';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createTestServerAdapter('/api/fets');
