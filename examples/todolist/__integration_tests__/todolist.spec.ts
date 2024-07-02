/* eslint-disable camelcase */
import { globalAgent } from 'http';
import { us_socket_local_port } from 'uWebSockets.js';
import { fetch } from '@whatwg-node/fetch';
import { app } from '../src/app';

describe('TodoList', () => {
  let port: number;
  beforeAll(done => {
    app.listen(0, listenSocket => {
      if (!listenSocket) {
        done.fail('Failed to start the server');
        return;
      }
      port = us_socket_local_port(listenSocket);
      done();
    });
  });
  afterAll(() => {
    app.close();
    globalAgent.destroy();
  });
  it('should work', async () => {
    const response = await fetch(`http://localhost:${port}/todos`);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([]);
  });
  it('should show Swagger UI', async () => {
    const response = await fetch(`http://localhost:${port}/docs`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/html');
    await expect(response.text()).resolves.toContain('<title>SwaggerUI</title>');
  });
  it('should expose OpenAPI document', async () => {
    const response = await fetch(`http://localhost:${port}/openapi.json`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    await expect(response.json()).resolves.toMatchSnapshot();
  });
});
