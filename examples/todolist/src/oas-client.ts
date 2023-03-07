import { createClient, Mutable } from 'fets';
import type oas from './saved_openapi';

const client = createClient<Mutable<typeof oas>>({
  endpoint: 'http://localhost:3000',
});

const someTodosToAdd = ['Drink coffee', 'Write some code', 'Drink more coffee', 'Write more code'];

(async () => {
  // Adding some todos
  for (const todo of someTodosToAdd) {
    const addTodoRes = await client['/todo'].put({
      json: {
        content: todo,
      },
    });

    const addTodoJson = await addTodoRes.json();
    console.log(addTodoJson.id);
  }

  // Getting all todos
  const getTodosRes = await client['/todos'].get();
  const getTodosJson = await getTodosRes.json();
  console.table(getTodosJson);

  // Deleting the first todo
  const deleteTodoRes = await client['/todo/{id}'].delete({
    params: {
      id: getTodosJson[0].id,
    },
  });
  if (!deleteTodoRes.ok) {
    console.error('Failed to delete todo');
  }
})();
