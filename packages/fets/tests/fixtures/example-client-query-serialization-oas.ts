/* eslint-disable */
export default {
  openapi: '3.0.3',
  servers: ['https://postman-echo.com'],
  paths: {
    '/get': {
      get: {
        summary: 'GET Request',
        description: '',
        operationId: 'GetGet',
        deprecated: 0,
        parameters: [
          {
            name: 'shallow',
            in: 'query',
            description: '',
            schema: {
              type: 'string',
              required: false,
            },
          },
          {
            name: 'deep',
            in: 'query',
            description: '',
            schema: {
              type: 'object',
              properties: {
                key1: {
                  type: 'string',
                  example: 'bar',
                },
                key2: {
                  type: 'string',
                  example: 'baz',
                },
              },
            },
            style: 'deepObject',
            explode: true,
            required: false,
          },
          {
            name: 'array',
            in: 'query',
            description: '',
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            required: false,
          },
        ],
        responses: {
          '200': {
            description: '',
            content: {
              'application/json; charset=utf-8': {
                schema: {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: '',
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
