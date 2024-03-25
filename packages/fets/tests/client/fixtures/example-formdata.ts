/* eslint-disable */
export default {
  openapi: '3.0.3',
  servers: ['https://postman-echo.com'],
  paths: {
    '/post': {
      post: {
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  blob: {
                    type: 'string',
                    format: 'binary',
                  },
                  boolean: {
                    type: 'boolean',
                  },
                  number: {
                    type: 'number',
                  },
                },
                additionalProperties: false,
                required: ['blob', 'boolean', 'number'],
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: '',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'object',
                  properties: {
                    formdata: {
                      type: 'object',
                      properties: {
                        blob: {
                          type: 'string',
                        },
                        boolean: {
                          type: 'boolean',
                        },
                        number: {
                          type: 'number',
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
    },
  },
} as const;
