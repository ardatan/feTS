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
    const resJson = await response.json();
    expect(resJson.url).toBe('https://example.com/todo/hello%20world');
  });

  it('should encode slash characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'foo/bar',
      },
    });
    const resJson = await response.json();
    expect(resJson.url).toBe('https://example.com/todo/foo%2Fbar');
  });

  it('should encode query string injection characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'id?evil=true',
      },
    });
    const resJson = await response.json();
    expect(resJson.url).toBe('https://example.com/todo/id%3Fevil%3Dtrue');
  });

  it('should not double-encode simple alphanumeric path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: 'abc123',
      },
    });
    const resJson = await response.json();
    expect(resJson.url).toBe('https://example.com/todo/abc123');
  });

  it('should encode unicode characters in path params', async () => {
    const response = await client['/todo/{id}'].get({
      params: {
        id: '日本語',
      },
    });
    const resJson = await response.json();
    expect(resJson.url).toBe(
      'https://example.com/todo/%E6%97%A5%E6%9C%AC%E8%AA%9E',
    );
  });
});
