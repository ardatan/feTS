import { createClient } from "fets";
import type { router } from "./index";

function assertExp<T>(exp: T, message: string): asserts exp {
    if (!exp) {
        throw new Error(message);
    }
}

const client = createClient<typeof router>({
    endpoint: "http://localhost:3000",
});

// Add todo

const addTodoRes = await client["/todo"].put({
    json: {
        content: "Drink coffee",
    },
});

const addedTodo = await addTodoRes.json();

// Ensure todo is there

const getTodosRes = await client["/todo/:id"].get({
    params: {
        id: addedTodo.id,
    },
});

assertExp(getTodosRes.ok, "Todo not found");

const todo = await getTodosRes.json();

assertExp(todo.content === "Drink coffee", "Todo content is not correct");

// Delete todo

const deleteTodoRes = await client["/todo/:id"].delete({
    params: {
        id: addedTodo.id,
    },
});

assertExp(deleteTodoRes.ok, "Failed to delete todo");

