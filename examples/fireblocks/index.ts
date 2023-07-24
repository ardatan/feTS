import { createClient, type NormalizeOAS } from 'fets';
import type fireblocksOas from './fireblocks-oas';

const fireblocksClient = createClient<NormalizeOAS<typeof fireblocksOas>>({
  endpoint: 'https://api.fireblocks.io/v1',
});

async function main() {
  const res = await fireblocksClient['/payments/payout'].post({
    json: {
      paymentAccount: {
        id: '5f9b3b1f2d5f9d0001c3f5b0',
        type: 'VAULT_ACCOUNT',
      },
      instructionSet: [],
    },
    headers: {
      Authorization: `Bearer ${process.env.FIREBLOCKS_API_KEY}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(`Failed ${error.type}, ${error.message}`);
  }

  const account = await res.json();
  console.log('Created account', account);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
