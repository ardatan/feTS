import { createClient } from 'fets';
import type { router } from './router';

const sdk = createClient<typeof router>({});

const someTodosToAdd = ['Drink coffee', 'Write some code', 'Drink more coffee', 'Write more code'];

// type Todo = RouteOutput<typeof router, '/todo/:id', 'get'>;

(async () => {
  const todo = {
    id: '1',
    content: 'Drink coffee',
  };
  console.log('Inferred type of todo:', todo);
  // Adding some todos
  for (const todo of someTodosToAdd) {
    const addTodoRes = await sdk['/todo'].put({
      json: {
        content: todo,
      },
    });

    const addTodoJson = await addTodoRes.json();
    console.log(addTodoJson.id);
  }

  // Getting all todos
  const getTodosRes = await sdk['/todos'].get();
  const getTodosJson = await getTodosRes.json();
  console.table(getTodosJson);

  // Deleting the first todo
  const deleteTodoRes = await sdk['/todo/:id'].delete({
    params: {
      id: getTodosJson[0].id,
    },
  });
  if (!deleteTodoRes.ok) {
    console.error('Failed to delete todo');
  }
})();
