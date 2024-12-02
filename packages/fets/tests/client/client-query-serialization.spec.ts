import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createClient, type NormalizeOAS } from 'fets';
import { Request, Response } from '@whatwg-node/fetch';
import type clientQuerySerializationOAS from './fixtures/example-client-query-serialization-oas';

describe('Client', () => {
  describe('GET', () => {
    type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
      fetchFn(info, init) {
        const request = new Request(info.toString(), init);
        return Promise.resolve(
          Response.json({
            url: request.url,
          }),
        );
      },
    });
    it('should support deep objects in query', async () => {
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

      const resJson = await response.json();
      assert.deepEqual(
        resJson.url,
        'https://postman-echo.com/get?shallow=foo&deep%5Bkey1%5D=bar&deep%5Bkey2%5D=baz&array=qux&array=quux',
      );
    });
    it('lazily handles json', async () => {
      const resJson = await client['/get'].get().json();
      assert.strictEqual(resJson.url, 'https://postman-echo.com/get');
    });
  });
});
