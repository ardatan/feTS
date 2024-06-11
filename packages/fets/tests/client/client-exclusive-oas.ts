import { createClient, NormalizeOAS } from 'fets';
import exampleExclusiveOas from './fixtures/example-exclusive-oas';

const client = createClient<NormalizeOAS<typeof exampleExclusiveOas>>({});

const res = await client['/minmaxtest'].post({
  json: {
    sequence: 1,
  },
});

if (res.ok) {
  const successBody = await res.json();
  console.log(successBody.sequence);
}
