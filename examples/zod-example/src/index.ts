import { createServer } from 'http';
import { createRouter, Response } from 'fets';
import { z } from 'zod';

const TodoSchema = z.object({
  id: z.string(),
  content: z.string(),
});

type Todo = z.infer<typeof TodoSchema>;

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
        params: z.object({
          id: z.string(),
        }),
      },
    },
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
        json: z.object({
          content: z.string(),
        }),
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
        params: z.object({
          id: z.string(),
        }),
      },
    },
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
  });

createServer(router).listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});
