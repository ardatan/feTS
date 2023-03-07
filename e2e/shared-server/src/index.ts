import { createRouter, Response, useErrorHandling } from 'fets';

export function createTestServerAdapter<TServerContext = {}>(base?: string) {
  return createRouter<TServerContext, {}>({
    base,
    plugins: [useErrorHandling()],
  })
    .route({
      method: 'GET',
      path: '/greetings/:name',
      handler: req =>
        Response.json(
          { message: `Hello ${req.params?.name}!` },
          {
            status: 200,
          },
        ),
    })
    .route({
      method: 'POST',
      path: '/bye',
      handler: async req => {
        const { name } = await req.json();
        return Response.json(
          { message: `Bye ${name}!` },
          {
            status: 200,
          },
        );
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
            status: 200,
          },
        ),
    });
}
