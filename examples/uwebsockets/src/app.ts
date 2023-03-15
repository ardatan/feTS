import { Readable } from 'node:stream';
import { createRouter, Response } from 'fets';
import { App, HttpRequest, HttpResponse } from 'uWebSockets.js';

interface ServerContext {
  req: HttpRequest;
  res: HttpResponse;
}

const router = createRouter<ServerContext>().route({
  method: 'GET',
  path: '/greetings',
  schemas: {
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
  handler: () => Response.json({ message: 'Hello World!' }),
});

export const app = App().any('/*', async (res, req) => {
  let body: any;
  const method = req.getMethod();
  if (method !== 'get' && method !== 'head') {
    body = new Readable({
      read() {},
    });
    res
      .onData(function (chunk, isLast) {
        body.push(Buffer.from(chunk));
        if (isLast) {
          body.push(null);
        }
      })
      .onAborted(function () {
        body.push(null);
      });
  }
  const headers = {};
  req.forEach((key, value) => {
    headers[key] = value;
  });
  const response = await router.fetch(
    req.getUrl(),
    {
      method,
      headers,
      body,
    },
    {
      req,
      res,
    },
  );
  res.writeStatus(`${response.status} ${response.statusText}`);
  response.headers.forEach((value, key) => {
    // content-length causes an error with Node.js's fetch
    if (key === 'content-length') {
      return;
    }
    res.writeHeader(key, value);
  });
  if (response.body) {
    for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
      res.write(chunk);
    }
  }
  res.end();
});
