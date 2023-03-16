import { createClient } from '../src/client/createClient.js';
import { createRouter, Response, RouteInput, RouteOutput } from '../src/index.js';
import { jSc } from '../src/jSc.js';

async function main() {
  const successfulResponseSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
    additionalProperties: false,
  } as const;

  const unauthorizedResponseSchema = {
    type: 'object',
    properties: {
      code: { type: 'string' },
    },
    additionalProperties: false,
  } as const;

  const notFoundResponseSchema = {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
    additionalProperties: false,
  } as const;

  const headersSchema = {
    type: 'object',
    properties: {
      'x-token': { type: 'string' },
    },
    required: ['x-token'],
    additionalProperties: false,
  } as const;

  const pathParamsSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    additionalProperties: false,
  } as const;

  const routerWithroute = createRouter()
    .route({
      method: 'GET',
      path: '/users/:id',
      schemas: {
        request: {
          params: pathParamsSchema,
          headers: headersSchema,
        },
        responses: {
          200: successfulResponseSchema,
          401: unauthorizedResponseSchema,
          404: notFoundResponseSchema,
        },
      },
      handler(req) {
        const token = req.headers.get('x-token');
        if (!token) {
          return Response.json(
            {
              code: 'UNAUTHORIZED',
            },
            {
              status: 401,
            },
          );
        }
        const userId = req.params.id;
        // @ts-expect-error - a is not defined in the schema
        const unexpectedParam = req.params.a;
        console.log(unexpectedParam);
        if (userId === 'only_available_id') {
          return Response.json({
            id: userId,
            name: 'The only one',
          });
        }
        return Response.json(
          {
            message: 'Not found',
          },
          {
            status: 404,
          },
        );
      },
    })
    .route({
      method: 'GET',
      path: '/users',
      schemas: {
        request: {
          headers: headersSchema,
        },
        responses: {
          200: {
            type: 'array',
            items: successfulResponseSchema,
          },
          401: unauthorizedResponseSchema,
        },
      } as const,
      handler: async req => {
        const token = req.headers.get('x-token');
        if (!token) {
          return Response.json(
            {
              code: 'UNAUTHORIZED',
            },
            {
              status: 401,
            },
          );
        }
        return Response.json([
          {
            id: 'only_available_id',
            name: 'The only one',
          },
        ]);
      },
    })
    .route({
      method: 'GET',
      path: '/health',
      handler: async () => {
        if (!globalThis['db']) {
          return Response.json(
            {
              error: 'DB is not available',
            },
            {
              status: 500,
            },
          );
        }
        return Response.json({
          message: 'OK',
        });
      },
    });

  const res = await routerWithroute.__client['/health'].get();

  // @ts-expect-error - 300 is not a valid status code
  res.status = 300;

  let notOkStatus = 500 as const;
  let okStatus = 200 as const;

  if (res.ok) {
    // @ts-expect-error - res.status cannot be 500
    notOkStatus = res.status;
    okStatus = res.status;
    console.log(notOkStatus);
  }

  if (!res.ok) {
    notOkStatus = res.status;
    // @ts-expect-error - res.status cannot be 200
    okStatus = res.status;
    console.log(okStatus);
  }

  if (res.status === 200) {
    const resOk: true = res.ok;
    // @ts-expect-error - res.ok should be true
    const resNotOk: false = res.ok;
    console.log(resOk, resNotOk);
    const jsonBody = await res.json();
    const message = jsonBody.message;
    // @ts-expect-error - error is not defined in the schema
    console.log(jsonBody.error);
    console.log(message);
  }

  if (res.status === 500) {
    // @ts-expect-error - res.ok should be false
    const resOk: true = res.ok;
    const resNotOk: false = res.ok;
    console.log(resOk, resNotOk);
    const jsonBody = await res.json();
    // @ts-expect-error - message is not defined in the schema
    console.log(jsonBody.message);
    const error = jsonBody.error;
    console.log(error);
  }

  // File uploads
  createRouter().route({
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
            },
          },
          required: ['file', 'description'],
          additionalProperties: false,
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          required: ['message'],
          additionalProperties: false,
        },
      },
    } as const,
    async handler(req) {
      const formData = await req.formData();
      const file = formData.get('file');
      console.log(await file.text());
      const description = formData.get('description');
      // @ts-expect-error - description is not a File
      console.log(await description.text());
      console.log(description);
      return Response.json({
        message: 'OK',
      });
    },
  });

  createRouter({
    title: 'Todo API',
    version: '1.0.0',
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            completed: {
              type: 'boolean',
            },
          },
          required: ['id', 'title', 'completed'],
          additionalProperties: false,
        },
      },
    } as const,
  }).route({
    operationId: 'getTodos',
    method: 'GET',
    path: '/todos',
    schemas: {
      responses: {
        200: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Todo',
          },
        },
      },
    } as const,
    async handler() {
      return Response.json([
        {
          id: '1',
          title: 'Todo 1',
          completed: false,
        },
      ]);
    },
  });
}

main();

const router = createRouter().route({
  path: 'me',
  method: 'GET',
  schemas: {
    request: {
      query: jSc.$object({
        id: jSc.$string(),
      }),
    },
    responses: {
      200: jSc.$object({
        id: jSc.$string(),
        name: jSc.$string(),
        age: jSc.$number().$optional(),
        role: jSc.$string().$enum('admin', 'user'),
      }),
      404: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
        },
      },
    },
  } as const,
  handler: () => {
    if (Math.random() > 0.5) {
      return Response.json(
        {
          code: 'NOT_FOUND',
        },
        {
          status: 404,
        },
      );
    }
    return Response.json(
      {
        id: '1',
        name: 'John',
        role: 'admin',
        age: 30,
      },
      {
        status: 200,
      },
    );
  },
});

const client = createClient<typeof router>();
const input: Input = {
  id: '1',
};
const response = await client.me.get({ query: input });

type Input = RouteInput<typeof router, 'me', 'get', 'query'>;
type User = RouteOutput<typeof router, 'me', 'get'>;

let data1: User | undefined;
if (response.ok) {
  const data = await response.json();
  data1 = data;
  const id = data.id;
  const name = data.name;
  const age = data.age;
  const role = data.role;
  console.log({
    id,
    name,
    age,
    role,
  });
}
console.log(data1);
