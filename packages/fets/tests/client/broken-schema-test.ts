import { createClient, NormalizeOAS } from '../../src/client';
import type brokenSchemaOas from './fixtures/example-broken-schema-oas';

const client = createClient<NormalizeOAS<typeof brokenSchemaOas>>({});

const res = await client['/{id}/meters'].get({
  params: {
    id: 1n,
  },
});

const data = await res.json();

console.log(data[0].id);

// @ts-expect-error id is not a string
const id: string = data[0].id;
console.log(id);
