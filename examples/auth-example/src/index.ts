import { createServer } from 'http';
import * as crypto from 'node:crypto';
import { createRouter, Response, Type } from 'fets';
import { bearerAuthPlugin, UnauthorizedSchema } from './common';

export const router = createRouter({
  openAPI: {
    components: {
      securitySchemes: {
        myExampleAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  plugins: [bearerAuthPlugin],
}).route({
  path: '/me',
  method: 'GET',
  tags: ['Operations for authenticated users'],
  security: [
    {
      myExampleAuth: {},
    },
  ],
  schemas: {
    responses: {
      200: Type.Object({
        id: Type.String({ format: 'uuid' }),
        name: Type.String(),
      }),
      401: UnauthorizedSchema,
    },
  },
  handler() {
    return Response.json({
      id: crypto.randomUUID(),
      name: 'John Doe',
    });
  },
});

createServer(router).listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});
