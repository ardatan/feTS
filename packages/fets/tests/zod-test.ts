import { z } from 'zod';
import { createRouter, Response, RouterInput, RouterOutput } from '../src';
import { createClient } from '../src/client';

const router = createRouter().route({
  method: 'POST',
  path: 'todoById',
  schemas: {
    request: {
      json: z.object({
        id: z.number({
          required_error: 'id is required',
        }),
      }),
    },
  },
  async handler(req) {
    const body = await req.json();
    if (body.id !== 1) {
      return Response.json(
        {
          message: 'Todo not found',
        },
        {
          status: 404,
        },
      );
    }
    return Response.json({
      id: 1,
      title: 'Todo 1',
    });
  },
});

const client = createClient<typeof router>();

const res = await client.todoById.post({
  json: {
    id: 1,
  },
});

if (res.ok) {
  const body = await res.json();
  console.log({
    id: body.id,
    title: body.title,
  });
} else {
  const body = await res.json();
  console.log(body.message);
}

type Todo = RouterOutput<typeof router, 'todoById', 'post'>;

const testTodo: Todo = {
  id: 1,
  title: 'Todo 1',
};

console.log(testTodo);

type TodoInput = RouterInput<typeof router, 'todoById', 'post'>;

const testTodoInput: TodoInput = {
  json: {
    id: 1,
  },
};

testTodoInput.json = {
  // @ts-expect-error - id is not a string
  id: '1',
};

console.log(testTodoInput);
