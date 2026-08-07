import { createClient, type NormalizeOAS } from '../../src';
import type apiKeyAnonymousExampleOas from './fixtures/example-apiKey-header-anonymous-oas';

type NormalizedOAS = NormalizeOAS<typeof apiKeyAnonymousExampleOas>;
const client = createClient<NormalizedOAS>({});

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

const clientWithPredefined = createClient<NormalizedOAS>({
  globalParams: {
    headers: {
      'x-api-key': '123',
    },
  },
});

await clientWithPredefined['/me'].get();
