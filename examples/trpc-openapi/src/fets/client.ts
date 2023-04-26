import { type Mutable, createClient } from 'fets';

import { oas } from '../server/oas';

export const client = createClient<Mutable<typeof oas>>({
  endpoint: 'http://localhost:3000/api',
});
