import { createRouter, Response, useErrorHandling } from 'fets';
import { z } from 'zod';

export function createTestServerAdapter<TServerContext = {}>(base?: string | undefined) {
  return createRouter<TServerContext, { schemas: {} }>({
    base,
    plugins: [useErrorHandling()],
  })
    .route({
      method: 'GET',
      path: '/greetings/:name',
      schemas: {
        request: {
          params: z.object({
            name: z.string(),
          }),
        },
      },
      handler: req => Response.json({ message: `Hello ${req.params?.name}!` }),
    })
    .route({
      method: 'POST',
      path: '/bye',
      schemas: {
        request: {
          json: z.object({
            name: z.string(),
          }),
        },
      },
      handler: async req => {
        const { name } = await req.json();
        return Response.json({ message: `Bye ${name}!` });
      },
    })
    .route({
      method: 'GET',
      path: '/',
      handler: () =>
        new Response(
          `
    <html>
        <head>
            <title>Platform Agnostic Server</title>
        </head>
        <body>
            <p>Hello World!</p>
        </body>
    </html>
`,
          {
            headers: {
              'Content-Type': 'text/html',
            },
          },
        ),
    });
}
