import { APIGatewayProxyEventV2, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createTestServerAdapter } from '@e2e/shared-server';

const app = createTestServerAdapter<ServerContext>();

interface ServerContext {
  event: APIGatewayProxyEventV2;
  lambdaContext: Context;
}

export async function handler(
  event: APIGatewayProxyEventV2,
  lambdaContext: Context,
): Promise<APIGatewayProxyResult> {
  const url = new URL(
    event.rawPath + (event.rawQueryString ? `?${event.rawQueryString}` : ''),
    'http://localhost',
  );

  const serverContext: ServerContext = {
    event,
    lambdaContext,
  };

  const response = await app.fetch(
    url,
    {
      method: event.requestContext.http.method,
      headers: event.headers as HeadersInit,
      body: event.body
        ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
        : undefined,
    },
    serverContext,
  );

  const responseHeaders: Record<string, string> = {};

  response.headers.forEach((value, name) => {
    responseHeaders[name] = value;
  });

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
    isBase64Encoded: false,
  };
}
