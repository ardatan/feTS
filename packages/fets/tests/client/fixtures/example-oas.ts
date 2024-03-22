/* eslint-disable */
export default {
  openapi: '3.0.1',
  info: {
    title: 'Todo List Example',
    description: 'A simple todo list example with feTS',
    version: '1.0.0',
  },
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: { id: { type: 'string' }, content: { type: 'string' } },
        required: ['id', 'content'],
        additionalProperties: false,
      },
    },
  },
  paths: {
    '/todos': {
      get: {
        description: 'Get all todos',
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Todo' } },
              },
            },
          },
          default: {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },
    '/todo/{id}': {
      get: {
        description: 'Get a todo',
        responses: {
          '200': {
            description: '',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Todo' } } },
          },
          '404': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                  additionalProperties: false,
                },
              },
            },
          },
        },
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      },
      delete: {
        description: 'Delete a todo',
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' } },
                  required: ['id'],
                  additionalProperties: false,
                },
              },
            },
          },
          '404': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { error: { type: 'string' } },
                  required: ['error'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      },
    },
    '/todo/{id}.json': {
      get: {
        description: 'Get a todo',
        responses: {
          '200': {
            description: '',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Todo' } } },
          },
          '404': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string' } },
                  additionalProperties: false,
                },
              },
            },
          },
        },
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      },
      delete: {
        description: 'Delete a todo',
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { id: { type: 'string' } },
                  required: ['id'],
                  additionalProperties: false,
                },
              },
            },
          },
          '404': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { error: { type: 'string' } },
                  required: ['error'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      },
    },
    '/todo': {
      put: {
        description: 'Add a todo',
        responses: {
          '200': {
            description: '',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Todo' } } },
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { content: { type: 'string' } },
                required: ['content'],
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
    '/upload': {
      post: {
        description: 'Upload a file',
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string' },
                    size: { type: 'number' },
                    lastModified: { type: 'number' },
                  },
                  required: ['name', 'type', 'size', 'lastModified'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: { type: 'string', format: 'binary' },
                  description: { type: 'string', maxLength: 255 },
                  licensed: { type: 'boolean' },
                },
                required: ['file'],
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
  },
} as const;
