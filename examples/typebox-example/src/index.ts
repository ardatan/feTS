import { createServer } from 'http';
import * as crypto from 'node:crypto';
import { createRouter, FromSchema, Response } from 'fets';
import { Type } from '@sinclair/typebox';

const UUIDSchema = Type.String({
  format: 'uuid',
});

const ErrorSchema = Type.Object({
  message: Type.String(),
});

const ErrorResponseSchema = Type.Object(
  {
    error: ErrorSchema,
  },
  {
    title: 'ErrorResponse',
  },
);

const TodoSchema = Type.Object(
  {
    id: UUIDSchema,
    content: Type.String(),
    isDone: Type.Boolean(),
  },
  {
    title: 'Todo',
    description: 'A todo item',
  },
);

const TodoList = Type.Array(TodoSchema, {
  title: 'TodoList',
  description: 'A list of todo items',
});

type Todo = FromSchema<typeof TodoSchema>;

const todos: Todo[] = [];

export const router = createRouter({
  openAPI: {
    components: {
      schemas: {
        Todo: TodoSchema,
      },
    },
  },
})
  .route({
    description: 'Get all todos',
    method: 'GET',
    path: '/todos',
    schemas: {
      responses: {
        200: TodoList,
      },
    },
    handler: () => Response.json(todos),
  })
  .route({
    description: 'Get a todo item by id.',
    method: 'GET',
    path: '/todos/:id',
    schemas: {
      request: {
        params: Type.Object(
          {
            id: UUIDSchema,
          },
          {
            title: 'GetTodoParams',
          },
        ),
      },
      responses: {
        200: TodoSchema,
        404: ErrorResponseSchema,
      },
    },
    handler: async ({ params: { id } }) => {
      const todo = todos.find(todo => todo.id === id);
      if (!todo) {
        return Response.json(
          {
            error: {
              message: `Todo with id ${id} not found`,
            },
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
    description: 'Create a new todo item.',
    method: 'PUT',
    path: '/todos',
    schemas: {
      request: {
        json: Type.Object({
          content: Type.String(),
        }),
      },
      responses: {
        200: TodoSchema,
      },
    },
    handler: async request => {
      const input = await request.json();
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: input.content,
        isDone: false,
      };
      todos.push(todo);
      return Response.json(todo);
    },
  })
  .route({
    description: 'Update an existing todo item.',
    method: 'PATCH',
    path: '/todos/:id',
    schemas: {
      request: {
        params: Type.Object({
          id: UUIDSchema,
        }),
        json: Type.Object({
          content: Type.Optional(Type.String()),
          isDone: Type.Optional(Type.Boolean()),
        }),
      },
      responses: {
        200: TodoSchema,
        404: ErrorResponseSchema,
      },
    },
    handler: async request => {
      const { id } = request.params;
      const index = todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return Response.json(
          {
            error: {
              message: 'not found',
            },
          },
          {
            status: 404,
          },
        );
      }
      const todo = todos[index];
      const input = await request.json();
      if (input.content !== undefined) {
        todo.content = input.content;
      }
      if (input.isDone !== undefined) {
        todo.isDone = input.isDone;
      }
      return Response.json(todo);
    },
  })
  .route({
    description: 'Delete a todo item by id.',
    method: 'DELETE',
    path: '/todos/:id',
    schemas: {
      request: {
        params: Type.Object({
          id: UUIDSchema,
        }),
      },
      responses: {
        200: Type.Object({
          id: UUIDSchema,
        }),
        404: ErrorResponseSchema,
      },
    },
    async handler(request) {
      const { id } = request.params;
      const index = todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return Response.json(
          {
            error: {
              message: 'not found',
            },
          },
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
  });

createServer(router).listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});
