import { Headers, Response } from '@whatwg-node/fetch';
import { createClient } from '../../src/client/createClient';
import { useOAuth } from '../../src/client/plugins/useAuth';

describe('useAuth', () => {
  it('should add Authorization header with Bearer token', async () => {
    const token = 'sampleToken12345';
    let receivedAuthorization = '';
    const client = createClient<any>({
      async fetchFn(_, init) {
        const headers = new Headers(init?.headers);
        receivedAuthorization = headers.get('Authorization') ?? '';
        return new Response('auth test', {
          status: 200,
        });
      },
      plugins: [useOAuth(token)],
    });
    await client['/authTest'].get();
    expect(receivedAuthorization).toBe(`Bearer ${token}`);
  });
});
