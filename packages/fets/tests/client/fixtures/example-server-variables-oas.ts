export default {
  openapi: '3.0.0',
  info: {
    title: 'Server Variables Test API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://{username}.server.com:{port}/{version}',
      variables: {
        username: {
          default: 'demo',
          description: 'This value is assigned by the service provider.',
        },
        port: {
          enum: ['8443', '443'],
          default: '8443',
        },
        version: {
          default: 'v1',
        },
      },
    },
  ],
  paths: {
    '/users': {
      get: {
        operationId: 'getUsers',
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
