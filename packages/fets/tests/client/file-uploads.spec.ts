import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createClient, createRouter, Response } from 'fets';
import { File } from '@whatwg-node/fetch';

describe('File Uploads', () => {
  const router = createRouter().route({
    path: '/upload',
    method: 'POST',
    schemas: {
      request: {
        formData: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
          required: ['file'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            size: {
              type: 'number',
            },
            text: {
              type: 'string',
            },
          },
          required: ['name', 'size', 'text'],
          additionalProperties: false,
        },
      },
    },
    async handler(request) {
      const formData = await request.formData();
      const file = formData.get('file');
      return Response.json({
        name: file.name,
        size: file.size,
        text: await file.text(),
      });
    },
  });
  const client = createClient<typeof router>({ fetchFn: router.fetch });

  it('should upload file', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const response = await client['/upload'].post({
      formData: {
        file,
      },
    });
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(await response.json(), {
      name: 'hello.txt',
      size: 5,
      text: 'hello',
    });
  });
});
