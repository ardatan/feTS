import { createRouter, FromSchema, Response } from 'fets';

const TodoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['id', 'content'],
  additionalProperties: false,
} as const;

type Todo = FromSchema<typeof TodoSchema>;

const todos: Todo[] = [];

export const router = createRouter({
  openAPI: {
    info: {
      title: 'Todo List Example',
      description: 'A simple todo list example with feTS',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Todo: TodoSchema,
      },
    },
  },
  plugins: [],
})
  .route({
    description: 'Get all todos',
    method: 'GET',
    path: '/todos',
    schemas: {
      responses: {
        200: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Todo',
          },
        },
      },
    } as const,
    handler: () => Response.json(todos),
  })
  .route({
    description: 'Get a todo',
    method: 'GET',
    path: '/todo/:id',
    schemas: {
      request: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          $ref: '#/components/schemas/Todo',
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    } as const,
    handler: async request => {
      const { id } = request.params;
      const todo = todos.find(todo => todo.id === id);
      if (!todo) {
        return Response.json(
          {
            message: `Todo with id ${id} not found`,
          },
          {
            status: 404,
          },
        );
      }
      return Response.json(todo);
    },
  })
  .route({
    description: 'Add a todo',
    method: 'PUT',
    path: '/todo',
    schemas: {
      request: {
        json: {
          type: 'object',
          properties: {
            content: { type: 'string' },
          },
          required: ['content'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          $ref: '#/components/schemas/Todo',
        },
      },
    } as const,
    handler: async request => {
      const input = await request.json();
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: input.content,
      };
      todos.push(todo);
      return Response.json(todo);
    },
  })
  .route({
    description: 'Delete a todo',
    method: 'DELETE',
    path: '/todo/:id',
    schemas: {
      request: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          additionalProperties: false,
          required: ['id'],
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
          required: ['error'],
          additionalProperties: false,
        },
      },
    } as const,
    handler: async request => {
      const { id } = request.params;
      const index = todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return Response.json(
          { error: 'not found' },
          {
            status: 404,
          },
        );
      }
      const todo = todos[index];
      todos.splice(index, 1);
      return Response.json({
        id: todo.id,
      });
    },
  })
  // BONUS
  .route({
    description: 'Upload a file',
    method: 'POST',
    path: '/upload',
    schemas: {
      request: {
        formData: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
            description: {
              type: 'string',
              maxLength: 255,
            },
          },
          required: ['file'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
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
    } as const,
    handler: async request => {
      const body = await request.formData();
      const file = body.get('file');
      const description = body.get('description');
      return Response.json({
        name: file.name,
        description,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      });
    },
  });
