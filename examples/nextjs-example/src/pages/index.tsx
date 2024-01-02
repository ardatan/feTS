import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createClient } from 'fets';
import type { router, Todo } from '../app/api/[...slug]/route';

const client = createClient<typeof router>({
  endpoint: '/api',
});

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    client['/todos']
      .get()
      .then(res => res.json())
      .then(todos => {
        setTodos(todos);
      })
      .catch(err => {
        alert(`Failed to fetch todos: ${err}`);
      });
  }, []);

  const [newTodo, setNewTodo] = useState<string>('');
  return (
    <>
      <Head>
        <title>feTS Example</title>
        <meta name="description" content="Example feTS App with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>
            <a href="/api/docs">Click here to use Swagger UI</a>
          </p>
          <fieldset>
            <legend>Add Todo</legend>
            <form>
              <label htmlFor="content">Content</label>
              <input
                type="text"
                id="content"
                name="content"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
              />
              <button
                onClick={async e => {
                  e.preventDefault();
                  const addRes = await client['/add-todo'].post({
                    json: {
                      content: newTodo,
                    },
                  });
                  if (addRes.ok) {
                    const newTodo = await addRes.json();
                    setTodos([...todos, newTodo]);
                    setNewTodo('');
                  } else {
                    alert('Failed to add todo');
                  }
                }}
              >
                Add
              </button>
            </form>
          </fieldset>
        </div>
        <p>
          <strong>Todo List</strong>
        </p>
        <br />
        <div>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>* {todo.content}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
