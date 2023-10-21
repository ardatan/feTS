import { Type } from '@sinclair/typebox';
import { createRouter } from '../src/createRouter';
import { Response } from '../src/Response';

createRouter({
  openAPI: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
}).route({
  path: '/me',
  method: 'GET',
  security: [{ bearerAuth: {} }],
  schemas: {
    responses: {
      200: Type.Object({
        id: Type.String(),
        name: Type.String(),
      }),
    },
  },
  handler() {
    return Response.json({
      id: '1',
      name: 'John Doe',
    });
  },
});
