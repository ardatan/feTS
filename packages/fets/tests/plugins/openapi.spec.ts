import { createRouter, Response } from 'fets';

describe('OpenAPI spec', () => {
  it('respects base path', async () => {
    const router = createRouter({
      base: '/api',
      plugins: [],
    }).route({
      path: '/greetings',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello World!`,
        }),
    });
    const res = await router.fetch('/api/openapi.json');
    const oas = await res.json();
    expect(oas.servers[0].url).toBe('/api');
  });
});
