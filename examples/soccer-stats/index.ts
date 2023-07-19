import { createClient, type NormalizeOAS } from 'fets';
import type swagger from './soccer-stats-swagger';

const client = createClient<NormalizeOAS<typeof swagger>>({
  endpoint: 'https://api.sportsdata.io/v4/soccer/stats',
});

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
  console.log(`- ID: ${item.AreaId}, Name: ${item.Name}`);
}
