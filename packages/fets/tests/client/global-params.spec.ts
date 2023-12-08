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

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.headers['x-api-key']).toBe('123');
    expect(data.query['foo']).toBe('bar');
  });
});
