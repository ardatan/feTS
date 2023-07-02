import { createClient, Mutable } from 'fets';
import type clickhouseOas from './clickhouse-oas';

const clickhouseClient = createClient<Mutable<typeof clickhouseOas>>({
  endpoint: 'https://api.clickhouse.cloud',
});

async function main() {
  const res = await clickhouseClient['/v1/organizations/:organizationId/services/:serviceId'].get({
    params: {
      // @ts-expect-error TODO: wrongly inferred names "Organizaiton ID" and "Service ID"
      organizationId,
      // @ts-expect-error TODO: wrongly inferred names "Organizaiton ID" and "Service ID"
      serviceId,
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
