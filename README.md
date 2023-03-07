# FETS

[![npm version](https://badge.fury.io/js/fets.svg)](https://badge.fury.io/js/fets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

FETS is a fully type-safe, web standards compliant, platform independent, and lightweight HTTP
framework written in TypeScript, it includes a fully type-safe server and OpenAPI client.

FETS works with the WHATWG Fetch API that works in any JavaScript environment including Node.js,
Deno, Bun, Cloudflare Workers, Next.js, Fastify, Express, AWS Lambdas and even in browsers.

- FETS Client is a fully type-safe HTTP client that accepts any valid OpenAPI document.

- FETS Server is a platform independent HTTP server that can be deployed to any JavaScript
  environment.

> JSON Schema allows you to have a type-safety during the implementation, request validation and 2x
> faster JSON serialization.

All these doesn't need **ANY CODE GENERATION** at all!

## Installation

```bash
yarn add fets
```

## Comparison with the existing solutions in the ecosystem

#### Why should I use this package instead of other packages like `itty-router`, `express` or `fastify`?

There are many packages out there that allow you to create HTTP routers, but they are not platform
agnostic. They are only for Node.js or only for those specific environments. But if you use this
package, your router will work in any environment that uses JavaScript.

#### Why should I use this package instead of tRPC?

FETS also doesn't need a code generation like tRPC doesn't, but FETS also allows you to export an
OpenAPI document based on the JSON Schema definitions if you don't want to share TypeScript
definitions between the client and the server. tRPC uses a programmatic solution like `zod` but FETS
uses a more popular alternative [JSON Schema](https://json-schema.org/) which is more portable and
completely language agnostic. If you want to have a similar experience like `zod` instead of writing
JSON Schemas manually with objects, you can use `@sinclair/typebox` to generate them by using an API
like `zod` has.
[See how to use typebox with FETS.](#using-a-programmatic-json-schema-builder-zod-like-api)

## Usage

It uses `.route()` method to add routes to the router with the following parameters;

- `method`: The HTTP method of the request. This is optional and it handles all methods if it's not
  given.
- `path`: The URL pattern that the request should match. The url pattern is a string that follows
  the [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) standard. You can
  learn more about URL patterns
  [here](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern#matching_a_pathname).
- `schemas`: An object that contains the schemas for the request and response. This brings a
  type-safety and validation to your requests and responses. You can learn more about schemas
  [here](#end-to-end-type-safety-and-validation-with-json-schema).
- `handler`: The function that will be called when the request matches the given method and path.
  This function can be either synchronous or asynchronous. If it's asynchronous, it should return a
  `Promise` that resolves to a `Response` object.

`Router` gives you an extended version of the regular `Request` object that has the following
properties:

- `request.params`: An object that contains the parameters that are given in the url pattern.
- `request.query`: An object that contains the query parameters that are given in the url.

You can learn more about the original `Request` object
[here](https://developer.mozilla.org/en-US/docs/Web/API/Request).

## Basic Examples for Client & Server

### FETS Server

```typescript
import { createServer } from 'node:http';
import { createRouter, FromSchema } from 'fets';

const users = [
    { id: "1", name: 'John Doe' },
    { id: "2", name: 'Jane Doe' },
];

const router = createRouter().route({
  method: 'GET',
  path: '/user/:id',
  schemas: {
    request: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
        additionalProperties: false
      }
    },
    responses: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        }
      },
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  } as const /* schemas should always be const */,
  handler: ({ params }) => {
    const user = users.find(user => user.id === params.id);
    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  }
});

createServer(router).listen(3000, () => {
    console.log(`Swagger UI is available at http://localhost:3000/docs`)
});
```

[See this section to learn more about the type safety on the server side](#end-to-end-type-safety-and-validation-with-json-schema)

### FETS Client

```typescript
import { createClient, Mutable } from 'fets'
import type oas from './oas'

// OpenAPI document should be exported from a TypeScript file with as const

const client = createClient<Mutable<oas>>({
  endpoint: 'https://example.com'
})

/* 
    or you can import the router types if you use monorepos
import type { router } from './router';

const client = createClient<typeof router>({
    endpoint: 'https://example.com',
});
*/

const response = await client['/user/:id'].get({
  params: {
    id: '1'
  }
})

if (!response.ok) {
  const errorJson = await response.json()
  console.error(errorJson.message)
}

const user = await response.json()
console.log(`User's name is ${user.name}`)
```

[See this section to learn more about the type safety on the client side](#type-safety-on-the-client-side)

## Middlewares

You can also use middlewares to handle requests. Middlewares are functions that are called before
the request is handled by the router. You can use them to handle authentication, logging, etc.

If a handler function doesn't return a `Response` object, the request will be passed to the next
handler.

```ts
// In the following example, we are checking if the request has an `Authorization` header.
const router = createRouter()
  .route({
    path: '*',
    handler: request => {
      if (!request.headers.get('Authorization')) {
        return new Response(null, {
          status: 401
        })
      }
    }
  })
  .route({
    path: '/users',
    method: 'GET',
    handler: request => {
      // It doesn't reach here if the request doesn't have an `Authorization` header.
    }
  })
```

### Handler chaining

You can also chain multiple handlers to a single route. In the following example, we are checking if
the request has an `Authorization` header and if the user is an admin.

```ts
import { RouteHandler } from 'fets'

const withAuth: RouteHandler = request => {
  if (!request.headers.get('Authorization')) {
    return new Response(null, {
      status: 401
    })
  }
}

const router = createRouter().route({
  path: '/users',
  method: 'GET',
  handler: [
    withAuth,
    request => {
      // It doesn't reach here if the request doesn't have an `Authorization` header.
    }
  ]
})
```

## Error handling

If an unexpected error is thrown, the response will have a `500` status code. You can use the
`try/catch` method to handle errors. Or you can use the plugins to handle errors like below.

```ts
import { HTTPError, useErrorHandling } from 'fets'

const router = createRouter({
  plugins: [useErrorHandling()]
}).route({
  path: '/users',
  method: 'GET',
  handler: request => {
    if (!request.headers.get('Authorization')) {
      // You can use `HTTPError` to return a custom error response.
      // It accepts a status code, a message, headers and a body.
      // If you pass a json object as the body, the response will be a json response.
      throw new HTTPError(
        401,
        'Unauthorized',
        {
          'WWW-Authenticate': 'Basic'
        },
        {
          message: 'You need to be authenticated to access this resource.'
        }
      )
    }
  }
})
```

## Plugins to handle CORS, cookies and more

FETS also provides a plugin system that allows you hook into the request/response lifecycle.

- `onRequest` - Called before the request is handled by the router
- - It has `endResponse` method that accepts a `Response` object to short-circuit the request
- `onResponse` - Called after the request is handled by the router
- - It allows you to modify the response before it is sent to the client

### Cookie Management

You can use `useCookies` to parse cookies from the request header and set cookies in the response by
using Web Standard [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore).

```ts
import { createRouter, Response, useCookies } from 'fets'

const router = createRouter({
  plugins: [useCookies()]
})
.route({
  path: '/users',
  method: 'GET',
  handler: request => {
    const sessionId = await request.cookieStore.get('session_id')
    if (!sessionId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await getUserBySessionId(sessionId)
    return Response.json(user)
  }
})
.route({
  path: '/login',
  method: 'POST',
  handler: async request => {
    const { username, password } = await request.json()
    const sessionId = await createSessionForUser({ username, password })
    await request.cookieStore.set('session_id', sessionId)
    return Response.json({ message: 'ok' })
  }
})
```

### CORS Management

You can also setup a CORS middleware to handle preflight CORS requests.

```ts
import { createRouter, useCORS } from 'fets'

const router = createRouter({
  plugins: [
    useCORS({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization']
    })
  ]
})
```

### Custom plugins

You can also create your own plugins to handle errors, logging, etc.

```ts
import { createRouter } from 'fets'

const useRequestId = (): RoutePlugin => {
  return {
    onRequest({ request, fetchAPI }) {
      let requestId = request.headers.get('X-Request-ID')
      if (!requestId) {
        requestId = fetchAPI.crypto.randomUUID()
        request.headers.set('X-Request-ID', requestId)
      }
    },
    onResponse({ response, fetchAPI }) {
      response.headers.set('X-Request-ID', request.headers.get('X-Request-ID'))
    }
  }
}

const router = createRouter({
  plugins: [useRequestId()]
})
```

## End-to-End Type Safety and Validation with JSON Schema

Even if the library provides you some type safety with TypeScript's type inference, you can still
use JSON Schemas to have a better type safety on both request and response.

To define type-safe routes, we use `schemas` parameters

### Typing the request

You can type individual parts of the `Request` object including JSON body, headers, query
parameters, and URL parameters.

#### JSON Body

```ts
import { createRouter, Response } from 'fets'

const router = createRouter().route({
  method: 'post',
  path: '/todos',
  // Define the request body schema
  schemas: {
    request: {
      json: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          completed: { type: 'boolean' }
        },
        additionalProperties: false,
        required: ['title']
      }
    }
  } as const,
  handler: async request => {
    // This part is fully typed
    const { title, completed } = await request.json()
    // ...
    return Response.json({ message: 'ok' })
  }
})
```

#### Headers

```ts
import { createRouter, Response } from 'fets'

const router = createRouter().route({
  method: 'post',
  path: '/todos',
  // Define the request body schema
  schemas: {
    request: {
      headers: {
        type: 'object',
        properties: {
          'x-api-key': { type: 'string' }
        },
        additionalProperties: false,
        required: ['x-api-key']
      }
    }
  } as const,
  handler: async request => {
    // This part is fully typed
    const apiKey = request.headers.get('x-api-key')
    // Would fail on TypeScript compilation
    const wrongHeaderName = request.headers.get('x-api-key-wrong')
    // ...
    return Response.json({ message: 'ok' })
  }
})
```

#### Path Parameters

```ts
import { createRouter, Response } from 'fets'

const router = createRouter().route({
  method: 'get',
  path: '/todos/:id',
  // Define the request body schema
  schemas: {
    request: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        additionalProperties: false,
        required: ['id']
      }
    }
  } as const,
  handler: async request => {
    // This part is fully typed
    const { id } = request.params
    // ...
    return Response.json({ message: 'ok' })
  }
})
```

#### Query Parameters

```ts
import { createRouter, Response } from 'fets'

const router = createRouter().addRoute({
  method: 'get',
  path: '/todos',
  // Define the request body schema
  schemas: {
    request: {
      query: {
        type: 'object',
        properties: {
          limit: { type: 'number' },
          offset: { type: 'number' }
        },
        additionalProperties: false,
        required: ['limit']
      },
    }
  } as const,
  handler: async request => {
    // This part is fully typed
    const { limit, offset } = request.query
    // You can also use `URLSearchParams` API
    const limit = request.parsedURL.searchParams.get('limit')
    // ...
    return Response.json({ message: 'ok' })
  }
})
```

### Typing the response

You can also type the response body by the status code. We strongly recommend to explicitly define
the status codes.

```ts
import { createRouter, Response } from 'fets'

const router = createRouter().addRoute({
  method: 'get',
  path: '/todos',
  // Define the request body schema
  schemas: {
    request: {
      headers: {
        type: 'object',
        properties: {
          'x-api-key': { type: 'string' }
        },
        additionalProperties: false,
        required: ['x-api-key']
      }
    },
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            completed: { type: 'boolean' }
          },
          additionalProperties: false,
          required: ['id', 'title', 'completed']
        }
      },
      401: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        },
        additionalProperties: false,
        required: ['message']
      }
    }
  } as const,
  handler: async request => {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return Response.json(
        { message: 'API key is required' },
        {
          status: 401
        }
      )
    }
    const todos = await getTodos({
      apiKey
    })
    // This part is fully typed
    return Response.json(todos, {
      status: 200
    })
  }
})
```

### Runtime validation

FETS uses [`ajv`](https://ajv.js.org/) to validate the request and response bodies at runtime.

### Safe and faster JSON serialization with response schemas

FETS uses [`fast-json-stringify`](https://github.com/fastify/fast-json-stringify) that serializes
JavaScript objects into JSON 2x faster than `JSON.stringify` by using JSON Schemas. All you have to
do is to define a correct response schema.

### OpenAPI Generation

You can generate OpenAPI specification from the defined routes by using OpenAPI plugin. This plugin
also provides you a [Swagger UI](https://swagger.io/tools/swagger-ui/) to test the API.

```ts
import { createRouter } from 'fets'

const router = createRouter({
      // Details for the generated OpenAPI document
      title: 'Todo List Example',
      description: 'A simple todo list example with fets',
      version: '1.0.0'
      // You can access the Swagger UI at `/docs`
      swaggerUIPath: '/docs',
      // You can download the OpenAPI specification as a JSON file
      oasPath: '/openapi.json'
})
```

### Using a programmatic JSON Schema builder (`zod`-like API)

```ts
import { Static, Type } from '@sinclair/typebox'

const Todo = Type.Object({
  id: Type.String(),
  title: Type.String(),
  completed: Type.Boolean()
})

type Todo = Static<typeof Todo>

const router = createRouter().route({
  path: '/todos',
  schemas: {
    responses: {
      200: Type.Array(Todo)
    }
  } as const
})
```

### Type-safety on the client side

With FETS, you can also type the request and response on the client side. But you have two options;

1. You can infer the types from the router itself.
2. You can use OpenAPI specification

#### Using the `router`

```ts file=examples/client.ts
import { createClient } from 'fets'
// Notice `type` in the import to avoid to import it on runtime
import type { router } from '../fets'

const client = createClient<typeof router>({
  endpoint: 'http://localhost:3000'
})

// Everything below is fully typed
const response = await client['/todo'].put({
  json: {
    title: 'Buy milk',
    completed: false
  }
})
const responseJson = await response.json()
console.table(responseJson)
```

#### Using OpenAPI

You need to save the OpenAPI document to a code file like below and export OAS with `as const`;

```ts
export default { openapi: '3.0.1' /* ... */ } as const
```

Then you need to import the OpenAPI document to the client code;

```ts file=examples/client.ts
import { createClient, Mutable } from 'fets'
// Notice `type` in the import to avoid to import it on runtime
import type oas from './saved_openapi'

const client = createClient<Mutable<typeof oas>>({
  endpoint: 'http://localhost:3000'
})

// Everything below is fully typed
const response = await client['/todo'].put({
  json: {
    title: 'Buy milk',
    completed: false
  }
})
const responseJson = await response.json()
console.table(responseJson)
```

## Testing

FETS has built-in support for HTTP injection. You can use any testing framework of your choice.

You can use the fetch method on your router instance for calling the router instance as if you were
doing an HTTP request.

> Calling the router.fetch method does not send an actual HTTP request. It basically simulates the
> HTTP request which is 100% conform with how Request/Response work.

### Using `fetch` method

```ts
import { router } from './router'

const response = await router.fetch('/todo', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Buy milk',
    completed: false
  })
})

const responseJson = await response.json()
console.assert(responseJson.title === 'Buy milk', 'Title should be "Buy milk"')
```

### Creating a test client

```ts
import { createClient } from 'fets'
import { router } from './router'

const client = createClient<typeof router>({
  fetchFn: router.fetch,
  endpoint: 'http://localhost:3000'
})

// Everything below is fully typed
const response = await client['/todo'].put({
  json: {
    title: 'Buy milk',
    completed: false
  }
})

const responseJson = await response.json()
console.assert(responseJson.title === 'Buy milk', 'Title should be "Buy milk"')
```

## Usage in environments

`Router` is actually an instance of `ServerAdapter` of `@whatwg-node/server` package. So you can use
it in any environment just like `ServerAdapter`. See the [documentation](../server/README.md) of
`@whatwg-node/server` package for more information.
