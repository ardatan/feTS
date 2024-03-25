import { createClient, type NormalizeOAS } from 'fets';
import { File, Request, Response } from '@whatwg-node/fetch';
import type clientFormDataOAS from './fixtures/example-formdata';

describe('Client', () => {
  describe('POST', () => {
    type NormalizedOAS = NormalizeOAS<typeof clientFormDataOAS>;
    const client = createClient<NormalizedOAS>({
      endpoint: 'https://postman-echo.com',
      async fetchFn(info, init) {
        const request = new Request(info, init);
        const formdataReq = await request.formData();
        return Response.json({
          formdata: Object.fromEntries(formdataReq.entries()),
        });
      },
    });
    it('handles formdata with non-string values', async () => {
      const response = await client['/post'].post({
        formData: {
          blob: new File(['foo'], 'foo.txt'),
          boolean: true,
          number: 42,
        },
      });
      const resJson = await response.json();
      expect(resJson.formdata).toMatchObject({
        boolean: 'true',
        number: '42',
      });
    });
  });
});
