import { HTTPError } from '@whatwg-node/server';
import { createRouter } from '../src/createRouter';

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
    expect(response.status).toBe(500);
    const result = await response.text();
    expect(result).toBe('');
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
    expect(response.status).toBe(412);
    const result = await response.json();
    expect(result).toMatchObject({
      extra: 'data',
    });
    expect(response.headers.get('x-foo')).toBe('bar');
  });
});
