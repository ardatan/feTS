import { createRouter, Response, Type } from '../../src/index.js';

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
    const res = await router.fetch('http://localhost:3000/api/openapi.json');
    const oas = await res.json();
    expect(oas.servers[0].url).toBe('/api');
  });

  it('marks required JSON body as required in OpenAPI spec', async () => {
    const router = createRouter().route({
      path: '/test',
      method: 'POST',
      schemas: {
        request: {
          json: Type.Object({
            name: Type.String(),
          }),
        },
      },
      handler: () => Response.json({ ok: true }),
    });
    const res = await router.fetch('http://localhost:3000/openapi.json');
    const oas = await res.json();
    expect(oas.paths['/test'].post.requestBody.required).toBe(true);
  });

  it('marks optional JSON body as not required in OpenAPI spec', async () => {
    const router = createRouter().route({
      path: '/test',
      method: 'POST',
      schemas: {
        request: {
          json: Type.Optional(
            Type.Object({
              name: Type.String(),
            }),
          ),
        },
      },
      handler: () => Response.json({ ok: true }),
    });
    const res = await router.fetch('http://localhost:3000/openapi.json');
    const oas = await res.json();
    expect(oas.paths['/test'].post.requestBody.required).toBe(false);
  });

  it('marks required formData body as required in OpenAPI spec', async () => {
    const router = createRouter().route({
      path: '/upload',
      method: 'POST',
      schemas: {
        request: {
          formData: Type.Object({
            file: Type.String({ format: 'binary' }),
          }),
        },
      },
      handler: () => Response.json({ ok: true }),
    });
    const res = await router.fetch('http://localhost:3000/openapi.json');
    const oas = await res.json();
    expect(oas.paths['/upload'].post.requestBody.required).toBe(true);
  });

  it('marks optional formData body as not required in OpenAPI spec', async () => {
    const router = createRouter().route({
      path: '/upload',
      method: 'POST',
      schemas: {
        request: {
          formData: Type.Optional(
            Type.Object({
              file: Type.String({ format: 'binary' }),
            }),
          ),
        },
      },
      handler: () => Response.json({ ok: true }),
    });
    const res = await router.fetch('http://localhost:3000/openapi.json');
    const oas = await res.json();
    expect(oas.paths['/upload'].post.requestBody.required).toBe(false);
  });
});
