import { createServer } from 'http';
import { createRouter, Response, RouterRequest } from 'fets';
import { App } from 'uWebSockets.js';
import { Type } from '@sinclair/typebox';

async function handler(request: RouterRequest) {
  try {
    const body = await request.json();
    if (!body || !body.name) {
      return Response.json({ message: 'Invalid request body' }, { status: 200 });
    }
    return Response.json({ message: `Hello, ${body.name}!` });
  } catch (error) {
    console.error('Error in handler:', error);
    return Response.json({ message: 'An error occurred' }, { status: 200 });
  }
}

let readyCount = 0;

function greetingsHandler() {
  return Response.json({ message: 'Hello, World!' });
}

const router = createRouter({})
  .route({
    method: 'GET',
    path: '/greetings',
    handler: greetingsHandler,
  })
  .route({
    method: 'GET',
    path: '/greetings-json-schema',
    schemas: {
      responses: {
        200: Type.Object({
          message: Type.String(),
        }),
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
        json: Type.Object({
          name: Type.String(),
        }),
      },
      responses: {
        200: Type.Object({
          message: Type.String(),
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
