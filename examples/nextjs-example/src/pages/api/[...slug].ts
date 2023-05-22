import { createRouter, FromSchema, Response } from 'fets';

const TODO_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
  },
  required: ['id', 'content'],
  additionalProperties: false,
} as const;

export type Todo = FromSchema<typeof TODO_SCHEMA>;

const todos: Todo[] = [
  {
    id: '1',
    content: 'Buy milk',
  },
  {
    id: '2',
    content: 'Buy eggs',
  },
  {
    id: '3',
    content: 'Buy bread',
  },
];

export default createRouter({
  swaggerUI: {
    endpoint: '/api/docs',
  },
  openAPI: {
    endpoint: '/api/openapi.json',
  },
})
  .route({
    method: 'GET',
    path: '/api/todos',
    schemas: {
      responses: {
        200: {
          type: 'array',
          items: TODO_SCHEMA,
        },
      },
    } as const,
    handler: () => Response.json(todos),
  })
  .route({
    method: 'POST',
    path: '/api/add-todo',
    schemas: {
      request: {
        json: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
            },
          },
          required: ['content'],
          additionalProperties: false,
        },
      },
      responses: {
        201: TODO_SCHEMA,
      },
    } as const,
    handler: async req => {
      const input = await req.json();
      const todo = {
        id: Math.random().toString(36).substring(7),
        content: input.content,
      };
      todos.push(todo);
      return Response.json(todo, {
        status: 201,
      });
    },
  });
