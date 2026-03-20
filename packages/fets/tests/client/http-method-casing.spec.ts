import { createClient, createRouter, Response } from 'fets';

describe('Client HTTP method casing', () => {
  it('should send PATCH method in uppercase', async () => {
    let capturedMethod: string | undefined;

    const router = createRouter().route({
      path: '/test',
      method: 'PATCH',
      handler: req => {
        capturedMethod = req.method;
        return Response.json({ ok: true });
      },
    });

    const client = createClient<typeof router>({
      endpoint: 'http://localhost:3000',
      fetchFn: router.fetch,
    });

    const res = await client['/test'].patch();

    expect(res.status).toBe(200);
    expect(capturedMethod).toBe('PATCH');
  });
});
