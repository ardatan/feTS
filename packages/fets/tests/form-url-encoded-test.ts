import { createClient, type NormalizeOAS } from '../src';
import type formUrlEncodedOas from './fixtures/example-form-url-encoded.oas';

const client = createClient<NormalizeOAS<typeof formUrlEncodedOas>>({});

const res = await client['/test'].post({
  formUrlEncoded: {
    name: 'test',
    age: 18,
  },
});

if (!res.ok) {
  throw new Error('not ok');
}
