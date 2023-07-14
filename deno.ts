import { serve } from 'https://deno.land/std@0.157.0/http/server.ts';
import { createRouter, Response } from 'npm:fets';

const router = createRouter().route({
  method: 'GET',
  path: '/greetings',
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
  handler: () => Response.json({ message: 'Hello World!' }),
});

serve(router, {
  onListen({ hostname, port }) {
    console.log(`SwaggerUI -> http://${hostname}:${port}/docs`);
  },
});
