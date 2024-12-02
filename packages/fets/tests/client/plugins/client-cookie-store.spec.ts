import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createClient, useClientCookieStore } from 'fets';
import { CookieStore } from '@whatwg-node/cookie-store';
import { Headers, Response } from '@whatwg-node/fetch';

describe('useClientCookieStore', () => {
  it('should work', async () => {
    const cookieStore = new CookieStore('foo=bar');
    let receivedCookie = '';
    const client = createClient<any>({
      async fetchFn(_, init) {
        const headers = new Headers(init?.headers);
        receivedCookie = headers.get('cookie') ?? '';
        return new Response('test', {
          status: 200,
          headers: {
            'set-cookie': 'test=1',
          },
        });
      },
      plugins: [useClientCookieStore(cookieStore)],
    });
    await client['/test'].get();
    assert.strictEqual(receivedCookie, 'foo=bar');
    const responseCookie = await cookieStore.get('test');
    assert.strictEqual(responseCookie?.value, '1');
  });
});
