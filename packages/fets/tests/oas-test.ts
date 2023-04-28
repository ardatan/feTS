import { createClient, Mutable } from '../src/client';
import type oas from './fixtures/example-oas';

const client = createClient<Mutable<typeof oas>>();

const getAllTodosRes = await client['/todos'].get();

if (!getAllTodosRes.ok) {
  throw new Error('Failed to get todos');
}

const todos = await getAllTodosRes.json();

const firstTodo = todos[0];

firstTodo.id = '123';
firstTodo.content = 'Hello world';
// @ts-expect-error - completed is not a property on Todo
firstTodo.completed = true;

const getTodo = await client['/todo/{id}'].get({
  params: {
    id: '1',
    // @ts-expect-error - foo is not a parameter
    foo: 'bar',
  },
});

const todo = await getTodo.json();

// @ts-expect-error - it can be an error response
todo.id = '123';

// @ts-expect-error - it can be a success response
todo.message = 'Hello world';

if (getTodo.ok) {
  const successResponse = await getTodo.json();
  successResponse.id = '123';
  successResponse.content = 'Hello world';
  // @ts-expect-error - completed is not a property on Todo
  successResponse.completed = true;
} else {
  const errorResponse = await getTodo.json();
  // @ts-expect-error - it cannot be a success response
  errorResponse.id = '123';
  errorResponse.message = 'Hello world';
}

const uploadRes = await client['/upload'].post({
  formData: {
    file: new File(['Hello world'], 'hello.txt'),
    description: 'Greetings',
  },
});

const uploadJson = await uploadRes.json();
console.log(uploadJson.name);
console.log(uploadJson.description);
console.log(uploadJson.type);
console.log(uploadJson.size);
console.log(uploadJson.lastModified);
