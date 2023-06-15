import { createClient, Mutable } from 'fets';
import spotifyOas from './spotify-oas';

const client = createClient<Mutable<typeof spotifyOas>>({
  endpoint: 'https://api.spotify.com/v1',
});

async function main() {
  const res = await client['/search'].get({
    query: {
      q: '2',
    },
  });
  if (!res.ok) {
    const err = await res.json();
    console.error(err);
    return;
  }
  const data = await res.json();
  console.log(data);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
