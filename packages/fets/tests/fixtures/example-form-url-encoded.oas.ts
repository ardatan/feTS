export default {
  paths: {
    '/test': {
      post: {
        operationId: 'test',
        requestBody: {
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  age: {
                    type: 'integer',
                  },
                },
                required: ['name', 'age'],
                additionalProperties: false,
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
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
