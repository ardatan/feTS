import { createRouter, Response, Type } from '../src/index.js';

describe('Router', () => {
  it('should have parsedUrl in Request object', async () => {
    const router = createRouter().route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.parsedUrl.pathname}!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/greetings/John');
    const json = await response.json();
    expect(json.message).toBe('Hello /greetings/John!');
  });
  it('should process parameters in the path', async () => {
    const router = createRouter().route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/greetings/John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });
  it('should decode parameters in the path', async () => {
    const router = createRouter().route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/greetings/John%20Doe');
    const json = await response.json();
    expect(json.message).toBe('Hello John Doe!');
  });
  it('should process query parameters', async () => {
    const router = createRouter().route({
      path: '/greetings',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.query.name}!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/greetings?name=John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });

  it('can pull route params from the basepath as well', async () => {
    const router = createRouter({ base: '/api' }).route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/api/greetings/John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });

  it('can handle nested routers', async () => {
    const router = createRouter<any, {}>();
    const nested = createRouter<any, {}>({
      base: '/api',
    });
    nested.route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    router.route({
      path: '/api/*',
      method: 'GET',
      // @ts-expect-error TODO
      handler: nested,
    });
    const response = await router.fetch('http://localhost:3000/api/greetings/John');
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });

  it('can get query params', async () => {
    const router = createRouter().route({
      path: '/foo',
      method: 'GET',
      handler: request =>
        Response.json({
          cat: request.query.cat,
          foo: request.query.foo,
          missing: request.query.missing,
        }),
    });
    const response = await router.fetch('https://foo.com/foo?cat=dog&foo=bar&foo=baz&missing=');
    const json = await response.json();
    expect(json).toMatchObject({ cat: 'dog', foo: ['bar', 'baz'], missing: '' });
  });
  it('supports "/" with base', async () => {
    const router = createRouter({
      base: '/api',
    }).route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello Root!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/api');
    const json = await response.json();
    expect(json.message).toBe('Hello Root!');
  });
  it('supports "/" without base', async () => {
    const router = createRouter().route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello Root!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000');
    const json = await response.json();
    expect(json.message).toBe('Hello Root!');
  });
  it('supports "/" in the base', async () => {
    const router = createRouter({
      base: '/',
    }).route({
      path: '/greetings',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello World!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000/greetings');
    const json = await response.json();
    expect(json.message).toBe('Hello World!');
  });
  it('supports "/" both in the base and in the route', async () => {
    const router = createRouter({
      base: '/',
    }).route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello World!`,
        }),
    });
    const response = await router.fetch('http://localhost:3000');
    const json = await response.json();
    expect(json.message).toBe('Hello World!');
  });
  it('handles POST bodies', async () => {
    const router = createRouter().route({
      path: '/greetings',
      method: 'POST',
      handler: async request => {
        const json = await request.json();
        return Response.json({
          message: `Hello ${json.name}!`,
        });
      },
    });
    const response = await router.fetch('http://localhost:3000/greetings', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' }),
    });
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });
  it('nested query parameters', async () => {
    const schema = Type.Object({
      foo: Type.Object({
        bar: Type.String(),
      }),
    });
    const router = createRouter().route({
      path: '/nested_qs',
      method: 'GET',
      schemas: {
        request: {
          query: schema,
        },
        responses: {
          200: schema,
        },
      },
      handler: request => Response.json(request.query),
    });
    const response = await router.fetch('http://localhost:3000/nested_qs?foo[bar]=baz');
    const json = await response.json();
    expect(json).toEqual({ foo: { bar: 'baz' } });
  });

  describe('use() - router merging', () => {
    it('merges a sub-router without prefix', async () => {
      const usersRouter = createRouter<any, {}>().route({
        path: '/users',
        method: 'GET',
        handler: () => Response.json({ users: ['alice', 'bob'] }),
      });
      const mainRouter = createRouter<any, {}>().use(usersRouter);
      const response = await mainRouter.fetch('http://localhost:3000/users');
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.users).toEqual(['alice', 'bob']);
    });

    it('merges a sub-router with a prefix', async () => {
      const usersRouter = createRouter<any, {}>().route({
        path: '/users',
        method: 'GET',
        handler: () => Response.json({ users: ['alice', 'bob'] }),
      });
      const mainRouter = createRouter<any, {}>().use('/api', usersRouter);
      const response = await mainRouter.fetch('http://localhost:3000/api/users');
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.users).toEqual(['alice', 'bob']);
    });

    it('merges a sub-router that has its own base path', async () => {
      const usersRouter = createRouter<any, {}>({ base: '/users' }).route({
        path: '/:id',
        method: 'GET',
        handler: request => Response.json({ id: request.params.id }),
      });
      const mainRouter = createRouter<any, {}>().use(usersRouter);
      const response = await mainRouter.fetch('http://localhost:3000/users/42');
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.id).toBe('42');
    });

    it('merges multiple sub-routers', async () => {
      const usersRouter = createRouter<any, {}>().route({
        path: '/users',
        method: 'GET',
        handler: () => Response.json({ resource: 'users' }),
      });
      const postsRouter = createRouter<any, {}>().route({
        path: '/posts',
        method: 'GET',
        handler: () => Response.json({ resource: 'posts' }),
      });
      const mainRouter = createRouter<any, {}>().use(usersRouter).use(postsRouter);
      const usersResponse = await mainRouter.fetch('http://localhost:3000/users');
      expect(usersResponse.status).toBe(200);
      expect(await usersResponse.json()).toEqual({ resource: 'users' });
      const postsResponse = await mainRouter.fetch('http://localhost:3000/posts');
      expect(postsResponse.status).toBe(200);
      expect(await postsResponse.json()).toEqual({ resource: 'posts' });
    });

    it('merges sub-router with prefix and route params', async () => {
      const itemsRouter = createRouter<any, {}>().route({
        path: '/:id',
        method: 'GET',
        handler: request => Response.json({ id: request.params.id }),
      });
      const mainRouter = createRouter<any, {}>().use('/items', itemsRouter);
      const response = await mainRouter.fetch('http://localhost:3000/items/99');
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.id).toBe('99');
    });

    it('does not register sub-router internal routes in merged router', async () => {
      const subRouter = createRouter<any, {}>({
        openAPI: { endpoint: '/openapi.json' },
      }).route({
        path: '/hello',
        method: 'GET',
        handler: () => Response.json({ hello: 'world' }),
      });
      const mainRouter = createRouter<any, {}>().use('/sub', subRouter);
      // The sub-router's internal /openapi.json should NOT be re-registered in the merged router
      const mergedPaths = mainRouter.__routes.map((r: any) => r.path);
      expect(mergedPaths).not.toContain('/sub/openapi.json');
      // The user-defined route should be in __routes with the prefix applied
      expect(mergedPaths).toContain('/sub/hello');
      // The merged route should be accessible
      const helloResponse = await mainRouter.fetch('http://localhost:3000/sub/hello');
      expect(helloResponse.status).toBe(200);
    });
  });
});
