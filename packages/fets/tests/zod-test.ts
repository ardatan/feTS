import { z } from 'zod';
import { createRouter, Response, RouterJsonPostInput, RouterJsonPostSuccessOutput } from '../src';
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

const client = createClient<typeof router>({});

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

type Todo = RouterJsonPostSuccessOutput<typeof router>['todoById'];

const testTodo: Todo = {
  id: 1,
  title: 'Todo 1',
};

console.log(testTodo);

type TodoInput = RouterJsonPostInput<typeof router>['todoById'];

let testTodoInput: TodoInput = {
  id: 1,
};

testTodoInput = {
  // @ts-expect-error - id is not a string
  id: '1',
};

console.log(testTodoInput);
