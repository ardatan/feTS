import { createClient, type NormalizeOAS } from 'fets';
import { type oas } from '../server/oas';

export const client = createClient<NormalizeOAS<typeof oas>>({
  endpoint: 'http://localhost:3000/api',
});
