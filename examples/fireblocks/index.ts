import { createClient, type NormalizeOAS } from 'fets';
import type oas from './oas';

const client = createClient<NormalizeOAS<typeof oas>>({
  endpoint: 'https://api.fireblocks.io/v1',
});

async function main() {
  const res = await client['/vault/accounts'].post({
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
