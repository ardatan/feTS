import { createClient, type NormalizeOAS } from 'fets';
import { Request, Response } from '@whatwg-node/fetch';
import type exampleOAS from './fixtures/example-oas';

type NormalizedOAS = NormalizeOAS<typeof exampleOAS>;

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
    const falsyClient = createClient<any>({
      endpoint: 'https://example.com',
      fetchFn: async url => {
        urls.push(String(url));
        return Response.json({});
      },
    });

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
    const colonClient = createClient<any>({
      endpoint: 'https://example.com',
      fetchFn: async url => {
        urls.push(String(url));
        return Response.json({});
      },
    });

    await colonClient['/items/:idx/:id'].get({ params: { id: 5, idx: 9 } });

    expect(urls).toEqual(['https://example.com/items/9/5']);
  });

  it('should replace every occurrence of the same path param', async () => {
    const urls: string[] = [];
    const multiClient = createClient<any>({
      endpoint: 'https://example.com',
      fetchFn: async url => {
        urls.push(String(url));
        return Response.json({});
      },
    });

    await multiClient['/orgs/{id}/members/{id}'].get({ params: { id: 1 } });
    await multiClient['/orgs/:id/members/:id'].get({ params: { id: 2 } });

    expect(urls).toEqual([
      'https://example.com/orgs/1/members/1',
      'https://example.com/orgs/2/members/2',
    ]);
  });
});
