import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client', () => {
  it('should support deep objects in query', async () => {
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
    });

    const response = await client['/get'].get({
      query: {
        shallow: 'foo',
        deep: {
          key1: 'bar',
          key2: 'baz',
        },
        array: ['qux', 'quux'],
      },
    });

    const json = await response.json();

    expect(json.url).toBe(
      'https://postman-echo.com/get?shallow=foo&deep%5Bkey1%5D=bar&deep%5Bkey2%5D=baz&array=qux&array=quux',
    );
  });
});
