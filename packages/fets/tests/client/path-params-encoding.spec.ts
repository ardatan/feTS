import { createClient, type NormalizeOAS } from 'fets';
import { Request, Response } from '@whatwg-node/fetch';
import type exampleOAS from './fixtures/example-oas';

type NormalizedOAS = NormalizeOAS<typeof exampleOAS>;

const pathParamsOas = {
  openapi: '3.0.3',
  info: { title: 'Path params', version: '1.0.0' },
  paths: {
    '/users/{id}': {
      get: {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'ok' } },
      },
    },
    '/flags/{enabled}': {
      get: {
        parameters: [{ name: 'enabled', in: 'path', required: true, schema: { type: 'boolean' } }],
        responses: { '200': { description: 'ok' } },
      },
    },
    '/empty/{value}': {
      get: {
        parameters: [{ name: 'value', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'ok' } },
      },
    },
    '/orgs/{id}/members/{id}': {
      get: {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'ok' } },
      },
    },
  },
} as const;

type PathParamsOAS = NormalizeOAS<typeof pathParamsOas>;

// Colon-style paths that URLPattern cannot register (duplicate / hyphenated names)
// are typed manually so `params` still type-checks.
type ColonBoundaryClient = {
  '/items/:idx/:id': {
    get(requestParams: { params: { id: number; idx: number } }): Promise<Response>;
  };
  '/items/:user-id/:user': {
    get(requestParams: { params: { user: string; 'user-id': string } }): Promise<Response>;
  };
  '/orgs/:id/members/:id': {
    get(requestParams: { params: { id: number } }): Promise<Response>;
  };
};

function createUrlCapturingClient(urls: string[]) {
  return {
    endpoint: 'https://example.com',
    fetchFn: async (url: RequestInfo | URL) => {
      urls.push(String(url));
      return Response.json({});
    },
  };
}

describe('Client path parameter encoding', () => {
  const client = createClient<NormalizedOAS>({
    endpoint: 'https://example.com',
    fetchFn(info, init) {
      const request = new Request(info.toString(), init);
      return Promise.resolve(
        Response.json({
          url: request.url,
        }),
      );
    },
  });

  it('should encode special characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'hello world',
      },
    });
    const resJson = (await response.json()) as { url: string };
    expect(resJson.url).toBe('https://example.com/todo/hello%20world');
  });

  it('should encode slash characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'foo/bar',
      },
    });
    const resJson = (await response.json()) as { url: string };
    expect(resJson.url).toBe('https://example.com/todo/foo%2Fbar');
  });

  it('should encode query string injection characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'id?evil=true',
      },
    });
    const resJson = (await response.json()) as { url: string };
    expect(resJson.url).toBe('https://example.com/todo/id%3Fevil%3Dtrue');
  });

  it('should not double-encode simple alphanumeric path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'abc123',
      },
    });
    const resJson = (await response.json()) as { url: string };
    expect(resJson.url).toBe('https://example.com/todo/abc123');
  });

  it('should encode unicode characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: '日本語',
      },
    });
    const resJson = (await response.json()) as { url: string };
    expect(resJson.url).toBe('https://example.com/todo/%E6%97%A5%E6%9C%AC%E8%AA%9E');
  });

  it('should substitute falsy path params such as 0 and false', async () => {
    const urls: string[] = [];
    const falsyClient = createClient<PathParamsOAS>(createUrlCapturingClient(urls));

    await falsyClient['/users/{id}'].get({ params: { id: 0 } });
    await falsyClient['/flags/{enabled}'].get({ params: { enabled: false } });
    await falsyClient['/empty/{value}'].get({ params: { value: '' } });

    expect(urls).toEqual([
      'https://example.com/users/0',
      'https://example.com/flags/false',
      'https://example.com/empty/',
    ]);
  });

  it('should not let a shorter colon param match a longer one as a prefix', async () => {
    const urls: string[] = [];
    const colonClient = createClient(createUrlCapturingClient(urls)) as ColonBoundaryClient;

    await colonClient['/items/:idx/:id'].get({ params: { id: 5, idx: 9 } });
    await colonClient['/items/:user-id/:user'].get({
      params: { user: 'alice', 'user-id': '42' },
    });

    expect(urls).toEqual(['https://example.com/items/9/5', 'https://example.com/items/42/alice']);
  });

  it('should replace every occurrence of the same path param', async () => {
    const urls: string[] = [];
    const braceClient = createClient<PathParamsOAS>(createUrlCapturingClient(urls));
    const colonClient = createClient(createUrlCapturingClient(urls)) as ColonBoundaryClient;

    await braceClient['/orgs/{id}/members/{id}'].get({ params: { id: 1 } });
    await colonClient['/orgs/:id/members/:id'].get({ params: { id: 2 } });

    expect(urls).toEqual([
      'https://example.com/orgs/1/members/1',
      'https://example.com/orgs/2/members/2',
    ]);
  });
});
