import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createRouter } from 'fets';
import { HTTPError } from '@whatwg-node/server';

describe('Error Handling', () => {
  it('does not leak internal errors', async () => {
    const router = createRouter({}).route({
      path: '/test',
      method: 'GET',
      handler() {
        throw new Error('Some Internal Error');
      },
    });
    const response = await router.fetch('http://localhost:3000/test');
    assert.strictEqual(response.status, 500);
    const result = await response.text();
    assert.strictEqual(result, '');
  });
  it('handles HTTPError', async () => {
    const router = createRouter({}).route({
      path: '/test',
      method: 'GET',
      handler() {
        throw new HTTPError(
          412,
          'Some HTTP Error',
          {
            'x-foo': 'bar',
          },
          {
            extra: 'data',
          },
        );
      },
    });
    const response = await router.fetch('http://localhost:3000/test');
    assert.strictEqual(response.status, 412);
    const result = await response.json();
    assert.deepStrictEqual(result, {
      extra: 'data',
    });
    assert.strictEqual(response.headers.get('x-foo'), 'bar');
  });
});
