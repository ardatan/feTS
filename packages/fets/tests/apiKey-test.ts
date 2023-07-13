import { createClient, type NormalizeOAS } from '../src';
import type apiKeyExampleOas from './fixtures/example-apiKey-header-oas';

const client = createClient<NormalizeOAS<typeof apiKeyExampleOas>>({});

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
