export default {
  openapi: '3.0.3',
  info: {
    version: '1',
    title: 'Tree - OpenAPI 3.0',
    description: 'This is a sample of tree',
    termsOfService: 'http://swagger.io/terms/',
  },
  paths: {
    '/tree': {
      get: {
        tags: ['tree'],
        summary: 'Get tree',
        description: '',
        operationId: 'getTree',
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Node',
                },
              },
            },
          },
          '404': {
            description: 'Tree not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Node: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
            format: 'int64',
            example: 10,
          },
          child: {
            $ref: '#/components/schemas/Node',
          },
        },
      },
    },
  },
} as const;
