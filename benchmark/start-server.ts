import { createRouter, Response, useAjv } from 'fets';
import { App } from 'uWebSockets.js';
import { z } from 'zod';

async function handler(request: Request) {
  const body = await request.json();
  if (body.name) {
    return Response.json({
      message: `Hello, ${body.name}!`,
    });
  }
  return Response.json(
    {
      error: 'name is required',
    },
    {
      status: 400,
    },
  );
}

const router = createRouter({
  plugins: [useAjv()],
})
  .route({
    method: 'HEAD',
    path: '/ping',
    handler: () =>
      new Response(null, {
        status: 200,
      }),
  })
  .route({
    method: 'POST',
    path: '/no-schema',
    handler,
  })
  .route({
    method: 'POST',
    path: '/json-schema',
    schemas: {
      request: {
        json: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          required: ['message'],
          additionalProperties: false,
        },
      },
    } as const,
    handler,
  })
  .route({
    method: 'POST',
    path: '/zod',
    schemas: {
      request: {
        json: z.object({
          name: z.string(),
        }),
      },
      responses: {
        200: z.object({
          message: z.string(),
        }),
      },
    } as const,
    handler,
  });

App()
  .any('/*', router)
  .listen('0.0.0.0', 4000, socket => {
    if (!socket) {
      console.error('failed to listen');
      process.exit(1);
    }
    console.log('listening on 0.0.0.0:4000');
  });
