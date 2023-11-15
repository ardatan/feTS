import { File, FormData } from '@whatwg-node/fetch';
import { createRouter, Response, Type } from '../src/index.js';
import { registerFormats } from '../src/plugins/formats.js';

describe('TypeBox', () => {
  const router = createRouter({}).route({
    path: '/test',
    method: 'POST',
    schemas: {
      request: {
        json: Type.Object({
          foo: Type.String(),
          bar: Type.Number(),
        }),
        formData: Type.Object({
          file: Type.String({
            format: 'binary',
            maxLength: 10,
          }),
          description: Type.String({
            minLength: 10,
          }),
        }),
        headers: Type.Object({
          authorization: Type.String({
            pattern: '^Bearer .+$',
          }),
        }),
      },
      responses: {
        200: Type.Object({
          baz: Type.String(),
        }),
      },
    } as const,
    async handler(request) {
      await request.formData();
      return Response.json({
        baz: '123',
        foo: 123,
      });
    },
  });
  it('should return errors correctly for json request', async () => {
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic 123',
      },
      body: JSON.stringify({
        foo: 123,
        bar: '123',
        baz: true,
      }),
    });

    const resultJson = await response.json();
    expect(resultJson).toMatchObject({
      errors: [
        {
          name: 'headers',
          message: "Expected string to match '^Bearer .+$'",
          value: 'Basic 123',
          path: '/authorization',
        },
      ],
    });
    expect(response.status).toBe(400);
  });
  it('should return errors correctly for form data request', async () => {
    const formData = new FormData();
    formData.append('file', new File(['Hello World!'], 'hello.txt'));
    formData.append('description', 'HI!');
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
      body: formData,
      headers: {
        authorization: 'Bearer 123',
      },
    });
    const resultJson = await response.json();
    expect(resultJson).toMatchObject({
      errors: [
        {
          message: 'Expected string length less or equal to 10',
          name: 'formData',
          path: '/file',
          value: 'Hello World!',
        },
        {
          message: "Unknown format 'binary'",
          name: 'formData',
          path: '/file',
          value: 'Hello World!',
        },
        {
          message: 'Expected string length greater or equal to 10',
          name: 'formData',
          path: '/description',
          value: 'HI!',
        },
      ],
    });
    expect(response.status).toBe(400);
  });
  it('should handle empty responses', async () => {
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
    });
    expect(response.status).toBe(400);
    const resultJson = await response.json();
    expect(resultJson).toMatchObject({
      errors: [
        {
          message: 'Required property',
          name: 'headers',
          path: '/authorization',
        },
        {
          message: 'Expected string',
          name: 'headers',
          path: '/authorization',
        },
      ],
    });
  });
  it('applies body validation', async () => {
    const router = createRouter().route({
      path: '/lol',
      method: 'POST',
      schemas: {
        request: {
          json: Type.Object({
            id: Type.String(),
          }),
        },
      } as const,
      async handler(request) {
        await request.json();
        return Response.json({
          foo: 'If you see this validation for body is not working.',
        });
      },
    });

    const response = await router.fetch('/lol', {
      method: 'POST',
      body: JSON.stringify({
        name: 'kek',
      }),
    });

    expect(response.status).toEqual(400);
  });
  it('skips validating with non typebox schemas', async () => {
    const router = createRouter().route({
      path: '/lol',
      method: 'POST',
      schemas: {
        request: {
          json: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
            },
          },
        },
      } as const,
      async handler(request) {
        await request.json();
        return Response.json({
          foo: 'If you see this validation for body is not working.',
        });
      },
    });

    const response = await router.fetch('/lol', {
      method: 'POST',
      body: JSON.stringify({
        name: 'kek',
      }),
    });

    expect(response.status).toEqual(200);
  });
  it('validates the string formats', async () => {
    registerFormats();
    const router = createRouter().route({
      path: '/hello',
      method: 'POST',
      schemas: {
        request: {
          json: Type.Object({
            id: Type.String({
              format: 'uuid',
            }),
          }),
        },
      } as const,
      async handler(request) {
        const { id } = await request.json();
        return Response.json({
          message: `Hello ${id}!`,
        });
      },
    });

    const response = await router.fetch('/hello', {
      method: 'POST',
      body: JSON.stringify({
        id: '123',
      }),
    });

    expect(response.status).toEqual(400);

    const resultJson = await response.json();
    expect(resultJson).toMatchObject({
      errors: [
        {
          message: "Expected string to match 'uuid' format",
          name: 'json',
          path: '/id',
          value: '123',
        },
      ],
    });

    const validResponse = await router.fetch('/hello', {
      method: 'POST',
      body: JSON.stringify({
        id: '123e4567-e89b-12d3-a456-426614174000',
      }),
    });

    const validResultJson = await validResponse.json();
    expect(validResultJson).toMatchObject({
      message: 'Hello 123e4567-e89b-12d3-a456-426614174000!',
    });
  });
});
