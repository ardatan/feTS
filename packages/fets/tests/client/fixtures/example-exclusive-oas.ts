export default {
  openapi: '3.0.3',
  info: {
    title: 'Minmaxtest',
    description: 'Minmaxtest',
    version: '0.1.0',
  },
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    schemas: {},
  },
  paths: {
    '/minmaxtest': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sequence: {
                    type: 'integer',
                    exclusiveMinimum: true,
                    minimum: 0,
                  },
                },
                required: ['sequence'],
                additionalProperties: false,
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Default Response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sequence: {
                      type: 'integer',
                      exclusiveMinimum: true,
                      minimum: 0,
                    },
                  },
                  required: ['sequence'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
