import { createRouter, Response } from "fets";

const handler = createRouter({
  swaggerUI: {
    endpoint: "/api/docs",
  },
  openAPI: {
    endpoint: "/api/openapi.json",
  },
  fetchAPI: {
    Response: globalThis.Response,
  },
}).route({
  method: "GET",
  path: "/api/greetings",
  schemas: {
    responses: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
        required: ["message"],
        additionalProperties: false,
      },
    },
  } as const,
  handler: () => Response.json({ message: "Hello World!" }),
});

export { handler as GET, handler as POST };
