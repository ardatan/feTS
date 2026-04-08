 
export default {
  openapi: '3.1.0',
  info: {
    title: 'Nullable Object Test',
    version: '1.0.0',
  },
  paths: {
    '/receivers': {
      post: {
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_doc_front_file: {
                    type: ['object', 'null'],
                    properties: {
                      url: {
                        type: 'string',
                        format: 'uri',
                      },
                      name: {
                        type: 'string',
                      },
                      size: {
                        type: 'number',
                      },
                    },
                    required: ['url', 'name', 'size'],
                  },
                },
                additionalProperties: false,
              },
            },
          },
        },
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                  },
                  required: ['id'],
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
