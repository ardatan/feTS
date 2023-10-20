import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client Abort', () => {
  it('should abort the request', async () => {
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
    });

    await expect(client['/get'].get(undefined, { signal: AbortSignal.timeout(0) })).rejects.toThrow(
      'The operation was aborted',
    );
  });
});
