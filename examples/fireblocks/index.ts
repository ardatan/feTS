import { createClient, Mutable } from 'fets';
import type fireblocksOas from './fireblocks-oas.js';

const fireblocksClient = createClient<Mutable<typeof fireblocksOas>>();

const res = await fireblocksClient['/vault/accounts'].post({
  json: {
    name: 'test',
  },
});

if (!res.ok) {
  const error = await res.json();
  throw new Error(`Failed to create account: ${error.message} with code ${error.code}`);
}

const account = await res.json();
console.log('Created account', account);
