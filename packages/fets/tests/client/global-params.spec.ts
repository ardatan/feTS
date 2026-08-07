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
      endpoint: 'http://localhost:3000',
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

  it('should apply RequestInit fields from globalParams', async () => {
    let seenCredentials: RequestCredentials | undefined;
    const router = createRouter().route({
      path: '/test',
      method: 'GET',
      handler: () => new Response(null, { status: 204 }),
    });
    const client = createClient<typeof router>({
      endpoint: 'http://localhost:3000',
      fetchFn: async (_input, init) => {
        seenCredentials = init?.credentials;
        return new Response(null, { status: 204 });
      },
      globalParams: {
        credentials: 'include',
      },
    });

    await client['/test'].get();

    expect(seenCredentials).toBe('include');
  });

  it('should let per-request RequestInit override globalParams', async () => {
    let seenCredentials: RequestCredentials | undefined;
    const router = createRouter().route({
      path: '/test',
      method: 'GET',
      handler: () => new Response(null, { status: 204 }),
    });
    const client = createClient<typeof router>({
      endpoint: 'http://localhost:3000',
      fetchFn: async (_input, init) => {
        seenCredentials = init?.credentials;
        return new Response(null, { status: 204 });
      },
      globalParams: {
        credentials: 'include',
      },
    });

    await client['/test'].get({
      credentials: 'omit',
    });

    expect(seenCredentials).toBe('omit');
  });
});
