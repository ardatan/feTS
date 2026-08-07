export default {
  openapi: '3.0.0',
  info: {
    version: '1',
    title: 'AnyOf Circular Ref - OpenAPI 3.0',
    description: 'This is a sample with anyOf circular reference (FilterGroup referencing itself)',
    termsOfService: 'http://swagger.io/terms/',
  },
  paths: {
    '/test': {
      post: {
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestBody',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RequestBody: {
        type: 'object',
        properties: {
          filters: {
            type: 'array',
            items: {
              anyOf: [
                { $ref: '#/components/schemas/FilterGroup' },
                { $ref: '#/components/schemas/SoloFilter' },
              ],
            },
          },
        },
      },
      FilterGroup: {
        type: 'object',
        required: ['operator', 'filters'],
        properties: {
          operator: {
            type: 'string',
            enum: ['AND', 'OR'],
          },
          filters: {
            type: 'array',
            items: {
              anyOf: [
                { $ref: '#/components/schemas/FilterGroup' },
                { $ref: '#/components/schemas/SoloFilter' },
              ],
            },
          },
        },
      },
      SoloFilter: {
        type: 'object',
        required: ['field'],
        properties: {
          field: {
            type: 'string',
          },
        },
      },
    },
  },
} as const;
