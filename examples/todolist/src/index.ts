import { promises as fsPromises } from 'fs';
import { createServer } from 'http';
import { join } from 'path';
import { createRouter, FromSchema, Response } from 'fets';

const TodoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['id', 'content'],
  additionalProperties: false,
} as const;

type Todo = FromSchema<typeof TodoSchema>;

const todos: Todo[] = [];

export const router = createRouter({
  title: 'Todo List Example',
  description: 'A simple todo list example with FETS',
  version: '1.0.0',
})
  .route({
    description: 'Get all todos',
    method: 'GET',
    path: '/todos',
    schemas: {
      responses: {
        200: {
          type: 'array',
          items: TodoSchema,
        },
      },
    } as const,
    handler: () =>
      Response.json(todos, {
        status: 200,
      }),
  })
  .route({
    description: 'Get a todo',
    method: 'GET',
    path: '/todo/:id',
    schemas: {
      request: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
      responses: {
        200: TodoSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    } as const,
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
      return Response.json(todo, {
        status: 200,
      });
    },
  })
  .route({
    description: 'Add a todo',
    method: 'PUT',
    path: '/todo',
    schemas: {
      request: {
        json: {
          type: 'object',
          properties: {
            content: { type: 'string' },
          },
          required: ['content'],
          additionalProperties: false,
        },
      },
      responses: {
        200: TodoSchema,
      },
    } as const,
    handler: async request => {
      const input = await request.json();
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: input.content,
      };
      todos.push(todo);
      return Response.json(todo, {
        status: 200,
      });
    },
  })
  .route({
    description: 'Delete a todo',
    method: 'DELETE',
    path: '/todo/:id',
    schemas: {
      request: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          additionalProperties: false,
          required: ['id'],
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
          required: ['error'],
          additionalProperties: false,
        },
      },
    } as const,
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
      return Response.json(
        {
          id: todo.id,
        },
        {
          status: 200,
        },
      );
    },
  })
  // BONUS
  .route({
    description: 'Upload a file',
    method: 'POST',
    path: '/upload',
    schemas: {
      request: {
        formData: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
            description: {
              type: 'string',
              maxLength: 255,
            },
          },
          required: ['file'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            size: { type: 'number' },
            lastModified: { type: 'number' },
          },
          required: ['name', 'type', 'size', 'lastModified'],
          additionalProperties: false,
        },
      },
    } as const,
    handler: async request => {
      const body = await request.formData();
      const file = body.get('file');
      const description = body.get('description');
      return Response.json(
        {
          name: file.name,
          description,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        },
        {
          status: 200,
        },
      );
    },
  });

const savedOpenAPIFilePath = join(__dirname, 'saved_openapi.ts');
// Write the OpenAPI spec to a file
Promise.resolve(router.fetch('/openapi.json'))
  .then(openapiRes => openapiRes.text())
  .then(openapiText =>
    fsPromises.writeFile(
      savedOpenAPIFilePath,
      `/* eslint-disable */
export default ${openapiText} as const;`,
    ),
  )
  .then(() => console.log(`OpenAPI schema is written to ${savedOpenAPIFilePath}`))
  .catch(err => {
    console.error(`Could not write OpenAPI schema to file: ${err.message}`);
    process.exit(1);
  });

createServer(router).listen(3000, () => {
  console.log('SwaggerUI is served at http://localhost:3000/docs');
});
