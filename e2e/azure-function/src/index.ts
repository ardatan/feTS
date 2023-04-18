import { Context, HttpRequest } from '@azure/functions';
import { createTestServerAdapter } from '@e2e/shared-server';

const app = createTestServerAdapter('/api/fets');

export default async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  try {
    const response = await app.fetch(req.url, {
      method: req.method?.toString(),
      body: req.rawBody,
      headers: req.headers,
    });
    const responseText = await response.text();
    context.log('feTS response text:', responseText);

    const headersObj: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    context.log('feTS response headers:', headersObj);
    context.res = {
      status: response.status,
      body: responseText,
      headers: headersObj,
    };
  } catch (e: any) {
    context.log.error('Error:', e);
    context.res = {
      status: 500,
      body: e.message,
    };
  }
}
