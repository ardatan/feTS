import { createServer } from 'http';
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

let readyCount = 0;

function greetingsHandler() {
  return Response.json({ message: 'Hello, World!' });
}

const router = createRouter({
  plugins: [useAjv()],
})
  .route({
    method: 'GET',
    path: '/greetings',
    handler: greetingsHandler,
  })
  .route({
    method: 'GET',
    path: '/greetings-ajv',
    schemas: {
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
    handler: greetingsHandler,
  })
  .route({
    method: 'HEAD',
    path: '/ping',
    handler: () =>
      new Response(null, {
        status: readyCount === 2 ? 200 : 500,
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

createServer(router).listen(4000, () => {
  readyCount++;
  console.log('listening on 0.0.0.0:4000');
});

App()
  .any('/*', router)
  .listen('0.0.0.0', 4001, socket => {
    if (!socket) {
      console.error('failed to listen');
      process.exit(1);
    }
    readyCount++;
    console.log('listening on 0.0.0.0:4001');
  });
