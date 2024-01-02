import { createRouter, FromSchema, Response, Type } from 'fets';

const TODO_SCHEMA = Type.Object({
  id: Type.String(),
  content: Type.String(),
});

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

export const router = createRouter({
  base: '/api',
})
  .route({
    method: 'GET',
    path: '/todos',
    schemas: {
      responses: {
        200: Type.Array(TODO_SCHEMA),
      },
    },
    handler: () => Response.json(todos),
  })
  .route({
    method: 'POST',
    path: '/add-todo',
    schemas: {
      request: {
        json: Type.Object({
          content: Type.String(),
        }),
      },
      responses: {
        201: TODO_SCHEMA,
      },
    },
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

export { router as GET, router as POST };
