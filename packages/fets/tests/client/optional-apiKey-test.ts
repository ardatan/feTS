import { createClient, type NormalizeOAS } from '../../src';

type NormalizedOAS = NormalizeOAS<
  (typeof import('./fixtures/example-optional-apiKey-header-oas'))['default']
>;
const client = createClient<NormalizedOAS>({});

// Auth is optional because security includes an anonymous `{}` alternative
await client['/me'].get();

const res = await client['/me'].get({
  headers: {
    'x-api-key': '123',
  },
});

if (!res.ok) {
  const errData = await res.json();
  throw new Error(errData.message);
}
const data = await res.json();
console.info(`User ${data.id}: ${data.name}`);
