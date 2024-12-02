import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './client/fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client Abort', () => {
  it('should abort the request', async () => {
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
    });

    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';
    await assert.rejects(client['/get'].get({ signal: AbortSignal.timeout(1) }), abortError);
  });
});
