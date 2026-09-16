import { createClient, type NormalizeOAS } from 'fets';
import type clientQuerySerializationOAS from './client/fixtures/example-client-query-serialization-oas';

type NormalizedOAS = NormalizeOAS<typeof clientQuerySerializationOAS>;

describe('Client Abort', () => {
  it('should abort the request', async () => {
    const abortReason = new DOMException('The request was aborted', 'AbortError');
    const fetchFn = jest.fn((_url: string, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;

        if (!signal) {
          reject(new Error('Expected an abort signal'));
          return;
        }

        if (signal.aborted) {
          reject(signal.reason);
          return;
        }

        signal.addEventListener(
          'abort',
          () => {
            reject(signal.reason);
          },
          { once: true },
        );
      });
    });
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
      fetchFn,
    });
    const controller = new AbortController();
    const response$ = client['/get'].get({ signal: controller.signal });
    controller.abort(abortReason);

    await expect(response$).rejects.toMatchObject({
      name: 'AbortError',
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});
