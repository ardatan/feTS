import { z } from 'zod';
import { createRouter, Response } from '../src/index.js';

describe('Router', () => {
  it('should have parsedUrl in Request object', async () => {
    const router = createRouter();
    router.route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.parsedUrl.pathname}!`,
        }),
    });
    const response = await router.fetch('/greetings/John');
    const json = await response.json();
    expect(json.message).toBe('Hello /greetings/John!');
  });
  it('should process parameters in the path', async () => {
    const router = createRouter();
    router.route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('/greetings/John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });
  it('should decode parameters in the path', async () => {
    const router = createRouter();
    router.route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('/greetings/John%20Doe');
    const json = await response.json();
    expect(json.message).toBe('Hello John Doe!');
  });
  it('should process query parameters', async () => {
    const router = createRouter();
    router.route({
      path: '/greetings',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.query.name}!`,
        }),
    });
    const response = await router.fetch('/greetings?name=John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });
  it('should process multiple handlers for the same route', async () => {
    const router = createRouter<{
      message: string;
    }>();
    router.route({
      path: '/greetings',
      method: 'GET',
      handler: [
        (_request, ctx) => {
          ctx.message = 'Hello';
        },
        (request, ctx) => {
          ctx.message += ` ${request.query.name}!`;
          return Response.json({ message: ctx.message });
        },
      ],
    });
    const response = await router.fetch('/greetings?name=John');
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });

  it('can match multiple routes if earlier handlers do not return (as middleware)', async () => {
    const router = createRouter<any, any>();
    router.route({
      path: '/greetings',
      method: 'GET',
      handler: [
        (_request, ctx) => {
          ctx.message = 'Hello';
        },
        (_request, ctx) => {
          ctx.message += ` to you`;
        },
      ],
    });
    router.route({
      path: '/greetings',
      method: 'GET',
      handler: (request, ctx) => {
        ctx.message += ` ${request.query.name}!`;
        return Response.json({ message: ctx.message });
      },
    });
    const response = await router.fetch('/greetings?name=John');
    const json = await response.json();
    expect(json.message).toBe('Hello to you John!');
  });
  it('can pull route params from the basepath as well', async () => {
    const router = createRouter({ base: '/api' });
    router.route({
      path: '/greetings/:name',
      method: 'GET',
      handler: request =>
        Response.json({
          message: `Hello ${request.params.name}!`,
        }),
    });
    const response = await router.fetch('/api/greetings/John');
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
      handler: nested,
    });
    const response = await router.fetch('/api/greetings/John');
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });

  it('can get query params', async () => {
    const router = createRouter();
    router.route({
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
    expect(json).toMatchObject({ cat: 'dog', foo: ['bar', 'baz'], missing: undefined });
  });
  it('supports "/" with base', async () => {
    const router = createRouter({
      base: '/api',
    });
    router.route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello Root!`,
        }),
    });
    const response = await router.fetch('/api');
    const json = await response.json();
    expect(json.message).toBe('Hello Root!');
  });
  it('supports "/" without base', async () => {
    const router = createRouter();
    router.route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello Root!`,
        }),
    });
    const response = await router.fetch('');
    const json = await response.json();
    expect(json.message).toBe('Hello Root!');
  });
  it('supports "/" in the base', async () => {
    const router = createRouter({
      base: '/',
    });
    router.route({
      path: '/greetings',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello World!`,
        }),
    });
    const response = await router.fetch('/greetings');
    const json = await response.json();
    expect(json.message).toBe('Hello World!');
  });
  it('supports "/" both in the base and in the route', async () => {
    const router = createRouter({
      base: '/',
    });
    router.route({
      path: '/',
      method: 'GET',
      handler: () =>
        Response.json({
          message: `Hello World!`,
        }),
    });
    const response = await router.fetch('');
    const json = await response.json();
    expect(json.message).toBe('Hello World!');
  });
  it('handles POST bodies', async () => {
    const router = createRouter();
    router.route({
      path: '/greetings',
      method: 'POST',
      handler: async request => {
        const json = await request.json();
        return Response.json({
          message: `Hello ${json.name}!`,
        });
      },
    });
    const response = await router.fetch('/greetings', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' }),
    });
    const json = await response.json();
    expect(json.message).toBe('Hello John!');
  });
  it('onRoute hook', () => {
    const onRoute = jest.fn();
    const router = createRouter({
      plugins: [
        {
          onRoute,
        },
      ],
    });
    const handler = () => new Response('Hello World!');
    router.route({
      path: '/greetings',
      method: 'GET',
      handler,
    });
    expect(onRoute).toHaveBeenCalledWith({
      method: 'GET',
      path: '/greetings',
      handlers: [handler],
      openAPIDocument: {
        ...router.openAPIDocument,
      },
    });
  });
});
