import { createServer } from 'http';
import { createRouter, FromSchema, Response } from 'fets';
import { Type } from '@sinclair/typebox';

const TodoSchema = Type.Object({
  id: Type.String(),
  content: Type.String(),
});

type Todo = FromSchema<typeof TodoSchema>;

const todos: Todo[] = [];

export const router = createRouter()
  .route({
    description: 'Get all todos',
    method: 'GET',
    path: '/todos',
    handler: () => Response.json(todos),
  })
  .route({
    description: 'Get a todo',
    method: 'GET',
    path: '/todo/:id',
    schemas: {
      request: {
        params: Type.Object({
          id: Type.String(),
        }),
      },
      responses: {
        200: TodoSchema,
        404: Type.Object({
          message: Type.String(),
        }),
      },
    },
    handler: async ({ params: { id } }) => {
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
        params: Type.Object({
          id: Type.String(),
        }),
      },
      responses: {
        200: Type.Object({
          id: Type.String(),
        }),
        404: Type.Object({
          error: Type.String(),
        }),
      },
    },
    async handler(request) {
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
  });

createServer(router).listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});
