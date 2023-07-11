import { createClient, type NormalizeOAS } from 'fets';
import spotifyOas from './spotify-oas';

const client = createClient<NormalizeOAS<typeof spotifyOas>>({
  endpoint: 'https://api.spotify.com/v1',
});

async function main() {
  const res = await client['/search'].get({
    query: {
      q: 'dance monkey',
      type: ['track'],
    },
    headers: {
      Authorization: 'Bearer {token}',
    },
  });
  if (!res.ok) {
    const errData = await res.json();
    console.error(errData);
    return;
  }
  const data = await res.json();
  console.info(data);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
