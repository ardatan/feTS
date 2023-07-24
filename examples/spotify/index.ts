import 'dotenv/config';
import { createClient, type NormalizeOAS } from 'fets';
import spotifyOas from './spotify-oas';

const client = createClient<NormalizeOAS<typeof spotifyOas>>({
  endpoint: 'https://api.spotify.com/v1',
});

async function getToken() {
  const clientId = process.env.CLIENT_ID;
  if (!clientId) {
    throw new Error('Please set CLIENT_ID env');
  }
  const clientSecret = process.env.CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error('Please set CLIENT_SECRET env');
  }
  const res = await client['https://accounts.spotify.com/api/token'].post({
    formUrlEncoded: {
      grant_type: 'client_credentials',
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.access_token;
  }
  const errData = await res.json();
  throw new Error(errData.error_description);
}

// For testing purposes
export async function getRecommendations(token: string, artistId: string, trackId: string) {
  const res = await client['/recommendations'].get({
    query: {
      seed_genres: 'pop',
      limit: 3,
      seed_artists: artistId,
      seed_tracks: trackId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error.message);
  }
  const data = await res.json();
  return data;
}

async function main() {
  const token = await getToken();
  const res = await client['/search'].get({
    query: {
      q: 'dance monkey',
      type: ['track'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errData = await res.json();
    console.error(errData);
    return;
  }
  const data = await res.json();
  console.table(
    data.tracks?.items?.map(item => ({
      artist: item.artists?.map(artist => artist.name).join(', '),
      album: item.album?.name,
      name: item.name,
    })),
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
