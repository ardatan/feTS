export default {
  components: {
    securitySchemes: {
      apiKey: {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
    },
    schemas: {
      UnauthorizedResponse: {
        properties: {
          message: {
            type: 'string',
          },
        },
        type: 'object',
        additionalProperties: false,
        required: ['message'],
      },
      User: {
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
        },
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name'],
      },
    },
  },
  paths: {
    '/me': {
      get: {
        operationId: 'getMe',
        security: [
          {
            apiKey: [],
          },
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
            description: 'OK',
          },
          401: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedResponse',
                },
              },
            },
            description: 'Unauthorized',
          },
        },
        summary: 'get me',
        tags: ['User'],
      },
    },
  },
} as const;
