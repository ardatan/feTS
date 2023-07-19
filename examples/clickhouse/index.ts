import { createClient, type NormalizeOAS } from 'fets';
import type oas from './oas';

const client = createClient<NormalizeOAS<typeof oas>>({
  endpoint: 'https://api.clickhouse.cloud',
});

async function main() {
  const res = await client['/v1/organizations/:organizationId/services/:serviceId'].get({
    params: {
      organizationId: 'orgId',
      serviceId: 'svcId',
    },
  });
  if (!res.ok) {
    const errBody = await res.json();
    throw new Error(`Request failed: ${errBody.error} : ${errBody.status}`);
  }
  const body = await res.json();
  console.log(body);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
