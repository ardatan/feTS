export default {
  openapi: '3.0.0',
  info: {
    title: 'test',
    version: '0.1.0',
  },
  components: {
    schemas: {
      Something: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          name: {
            type: 'string',
          },
        },
        required: ['id', 'name'],
        additionalProperties: false,
      },
    },
  },
  paths: {
    '/{id}/meters': {
      get: {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Something',
                  },
                },
              },
            },
          },
          default: {
            description: '',
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
    securitySchemes: {
      Authorization: {
        description: 'Requires JWT to access',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      },
    },
  },
} as const;
