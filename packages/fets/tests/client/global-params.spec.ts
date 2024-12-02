import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createClient, createRouter, Response } from 'fets';

describe('Client Global Params', () => {
  it('should pass global params', async () => {
    const router = createRouter().route({
      path: '/test',
      method: 'GET',
      handler: req =>
        Response.json({
          headers: Object.fromEntries(req.headers.entries()),
          query: req.query,
        }),
    });
    const client = createClient<typeof router>({
      fetchFn: router.fetch,
      globalParams: {
        headers: {
          'x-api-key': '123',
        },
        query: {
          foo: 'bar',
        },
      },
    });

    const res = await client['/test'].get();

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.deepStrictEqual(data.headers['x-api-key'], '123');
  });
});
