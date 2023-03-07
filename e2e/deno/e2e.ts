import { serve } from 'https://deno.land/std@0.157.0/http/server.ts';
import { assertDeployedEndpoint } from '@e2e/shared-scripts';
import { createTestServerAdapter } from '@e2e/shared-server';

const abortCtrl = new AbortController();
const url = await new Promise(resolve => {
  serve(createTestServerAdapter(), {
    onListen({ hostname, port }) {
      resolve(`http://${hostname}:${port}`);
    },
    signal: abortCtrl.signal,
  });
});

try {
  await assertDeployedEndpoint(url);
  Deno.exit(0);
} catch (e) {
  console.error(e);
  Deno.exit(1);
}
