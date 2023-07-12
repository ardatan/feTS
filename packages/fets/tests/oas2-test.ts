import { createClient, type NormalizeOAS } from '../src';
import type exampleOAS2 from './fixtures/example-oas2';

const client = createClient<NormalizeOAS<typeof exampleOAS2>>({});

const res = await client['/api/v1/user/{userID}'].get({
  params: {
    userID: '1',
  },
});

if (!res.ok) {
  const error = await res.json();
  throw new Error(`Failed to get user: ${error.msg} (${error.request_id})`);
}

const user = await res.json();
console.log(user.id);
