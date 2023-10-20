import { createClient, type NormalizeOAS } from '../../src';
import oas from './fixtures/large-oas';

export const client = createClient<NormalizeOAS<typeof oas>>({
  endpoint: 'http://localhost:3000/api',
});

const usersRes = await client['/users'].get();

if (!usersRes.ok) {
  throw new Error('Failed to get users');
}

const usersResJson = await usersRes.json();
console.log(usersResJson.users[0].id);
