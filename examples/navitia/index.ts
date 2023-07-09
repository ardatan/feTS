import { createClient, type NormalizeOAS } from 'fets';
import type navitiaOas from './navitia-oas';

const navitiaClient = createClient<NormalizeOAS<typeof navitiaOas>>({
  endpoint: 'https://api.fireblocks.io/v1',
});

async function main() {
  const res = await navitiaClient['/coord/{lon};{lat}/'].get({
    params: {
      lon: 2.3387,
      lat: 48.8584,
    },
  });

  const result = await res.json();
  console.log(`Address`, result.address);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
