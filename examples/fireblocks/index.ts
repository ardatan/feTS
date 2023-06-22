import { createClient, Mutable } from 'fets';
import type fireblocksOas from './fireblocks-oas';

const fireblocksClient = createClient<Mutable<typeof fireblocksOas>>({
  endpoint: 'https://api.fireblocks.io/v1',
});

async function main() {
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
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
