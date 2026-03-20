import { createClient, type NormalizeOAS } from 'fets';
import type { ClientOptionsWithStrictEndpoint } from '../../src/client/types';
import serverVariablesOas from './fixtures/example-server-variables-oas';

type NormOAS = NormalizeOAS<typeof serverVariablesOas>;

// Valid endpoint matching the server variable template (port from enum, username/version are strings)
const client = createClient<NormOAS>({
  endpoint: 'https://me.server.com:443/v1',
});

// Port from enum: '8443' also valid
const client2 = createClient<NormOAS>({
  endpoint: 'https://demo.server.com:8443/v2',
});

void client;
void client2;

// Verify the endpoint type is properly inferred via ClientOptionsWithStrictEndpoint
// Port '444' is not in the enum ['8443', '443'] - this should be a type error
const _invalidOpts: ClientOptionsWithStrictEndpoint<NormOAS> = {
  // @ts-expect-error - port '444' is not in the enum ['8443', '443']
  endpoint: 'https://me.server.com:444/v1',
};
void _invalidOpts;

const getUsersRes = await client['/users'].get();

if (getUsersRes.ok) {
  const users = await getUsersRes.json();
  void users[0]?.id;
}
