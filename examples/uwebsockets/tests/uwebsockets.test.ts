/* eslint-disable prefer-promise-reject-errors */

/* eslint-disable no-async-promise-executor */

/* eslint-disable camelcase */
import { AddressInfo, createServer } from 'net';
import type { us_listen_socket } from 'uWebSockets.js';
import { fetch } from '@whatwg-node/fetch';

describe('uWebSockets', () => {
  const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajor < 16) {
    it('should be skipped', () => {});
    return;
  }
  let listenSocket: us_listen_socket;
  let port: number;
  beforeAll(async () => {
    port = await getPortFree();
    await new Promise<void>(async (resolve, reject) => {
      const { app } = await import('../src/app');
      app.listen(port, newListenSocket => {
        listenSocket = newListenSocket;
        if (listenSocket) {
          resolve();
          return;
        }
        reject('Failed to start the server');
      });
    });
  });
  afterAll(async () => {
    if (listenSocket) {
      const { us_listen_socket_close } = await import('uWebSockets.js');
      us_listen_socket_close(listenSocket);
    }
  });
  it('should work', async () => {
    const response = await fetch(`http://localhost:${port}/greetings`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: 'Hello World!' });
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
    expect(response.headers.get('content-type')).toBe('application/json');
    const json = await response.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "info": {
          "description": "An API written with feTS",
          "title": "feTS API",
          "version": "1.0.0",
        },
        "openapi": "3.0.1",
        "paths": {
          "/greetings": {
            "get": {
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "message": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "message",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
          },
        },
      }
    `);
  });
});
async function getPortFree() {
  return new Promise<number>(resolve => {
    const srv = createServer();
    srv.listen(0, () => {
      const port = (srv.address() as AddressInfo).port;
      srv.close(() => resolve(port));
    });
  });
}
