/* eslint-disable camelcase */
import { globalAgent } from 'http';
import {
  us_listen_socket_close,
  us_socket_local_port,
  type us_listen_socket,
} from 'uWebSockets.js';
import { fetch } from '@whatwg-node/fetch';
import { app } from '../src/app';

describe('TodoList', () => {
  const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajor < 16) {
    it('should be skipped', () => {});
    return;
  }
  let listenSocket: us_listen_socket;
  let port: number;
  beforeAll(done => {
    app.listen(0, newListenSocket => {
      listenSocket = newListenSocket;
      if (!listenSocket) {
        done.fail('Failed to start the server');
        return;
      }
      port = us_socket_local_port(listenSocket);
      done();
    });
  });
  afterAll(() => {
    if (listenSocket) {
      us_listen_socket_close(listenSocket);
    }
    globalAgent.destroy();
  });
  it('should work', async () => {
    const response = await fetch(`http://localhost:${port}/todos`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
  });
  it('should show Swagger UI', async () => {
    const response = await fetch(`http://localhost:${port}/docs`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/html');
    const html = await response.text();
    expect(html).toContain('<title>SwaggerUI</title>');
  });
  it('should expose OpenAPI document', async () => {
    const response = await fetch(`http://localhost:${port}/openapi.json`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    const json = await response.json();
    expect(json).toMatchSnapshot();
  });
});
