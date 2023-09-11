import { createClient, OASModel, type NormalizeOAS } from 'fets';
import type swagger from './soccer-stats-swagger';

type NormalizedOAS = NormalizeOAS<typeof swagger>;

const client = createClient<NormalizedOAS>({
  endpoint: 'https://api.sportsdata.io/v4/soccer/stats',
});

type Area = OASModel<NormalizedOAS, 'Area'>;

function printArea(area: Area) {
  console.log(`- ID: ${area.AreaId}, Name: ${area.Name}`);
}

async function main() {
  const res = await client['/{format}/Areas'].get({
    params: {
      format: 'json',
    },
    headers: {
      'Ocp-Apim-Subscription-Key': 'test',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();
  console.log(`Areas: ${data.length} items`);
  for (const item of data) {
    printArea(item);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
