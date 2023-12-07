import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './client/fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client Abort', () => {
  it('should abort the request', async () => {
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
    });

    await expect(client['/get'].get({ signal: AbortSignal.timeout(1) })).rejects.toThrow(
      'The operation was aborted',
    );
  });
});
