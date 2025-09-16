import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './client/fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client Abort', () => {
  it('should abort the request', async () => {
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
    });
    
    try {
      await client['/get'].get({ signal: AbortSignal.timeout(1) });
      throw new Error('The request should have been aborted');
    } catch (e: any) {
      if (e instanceof Error) {
        expect(e.name).toBe('TimeoutError');
      } else {
        expect(e.name).toBe('AbortError');
      }
    }
  });
});
