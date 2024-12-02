import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createRouter, Response } from 'fets';

describe('OpenAPI spec', () => {
  it('respects base path', async () => {
    const router = createRouter({
      base: '/api',
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
    assert.strictEqual(oas.servers[0].url, '/api');
  });
});
