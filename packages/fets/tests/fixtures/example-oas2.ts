export default {
  components: {
    schemas: {
      ErrResponse: {
        properties: {
          msg: {
            type: 'string',
          },
          request_id: {
            type: 'string',
          },
        },
        type: 'object',
      },
      'v1.User': {
        properties: {
          id: {
            format: 'int64',
            type: 'integer',
          },
          user_id: {
            type: 'string',
          },
          user_name: {
            type: 'string',
          },
        },
        type: 'object',
      },
    },
  },
  info: {
    license: {
      name: 'MIT',
    },
    title: 'user',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/user': {
      post: {
        operationId: 'createUser',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/v1.User',
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
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'OK',
          },
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'Error',
          },
        },
        summary: 'create user',
        tags: ['User'],
      },
    },
    '/api/v1/user/{userID}': {
      patch: {
        operationId: 'patchUser',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/v1.User',
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
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'OK',
          },
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'Error',
          },
        },
        summary: 'patch user',
        tags: ['User'],
      },
      delete: {
        operationId: 'deleteUser',
        responses: {
          '200': {
            description: 'OK',
          },
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'Error',
          },
        },
        summary: 'delete user',
        tags: ['User'],
      },
      get: {
        operationId: 'readUser',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/v1.User',
                },
              },
            },
            description: 'OK',
          },
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrResponse',
                },
              },
            },
            description: 'Error',
          },
        },
        summary: 'get user',
        tags: ['User'],
      },
      parameters: [
        {
          in: 'path',
          name: 'userID',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
    },
  },
} as const;
