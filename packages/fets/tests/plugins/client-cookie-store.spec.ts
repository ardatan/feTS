import { CookieStore } from '@whatwg-node/cookie-store';
import { createClient } from '../../src/client/createClient';
import { useClientCookieStore } from '../../src/client/plugins/useClientCookieStore';

describe('useClientCookieStore', () => {
  it('should work', async () => {
    const cookieStore = new CookieStore('foo=bar');
    let receivedCookie = '';
    const client = createClient({
      async fetchFn(_, init) {
        receivedCookie = (init?.headers as any).cookie ?? '';
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
    expect(receivedCookie).toBe('foo=bar');
    const responseCookie = await cookieStore.get('test');
    expect(responseCookie?.value).toBe('1');
  });
});
