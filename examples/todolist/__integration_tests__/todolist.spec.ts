/* eslint-disable camelcase */
import { createServer, globalAgent, Server } from 'http';
import { AddressInfo } from 'net';
import {
  type us_listen_socket,
  us_listen_socket_close,
  us_socket_local_port,
} from 'uWebSockets.js';
import { fetch } from '@whatwg-node/fetch';
import { app, router } from '../src/router';

describe('TodoList', () => {
  let port: number;

  describe('Node', () => {
    let server: Server;
    beforeAll(done => {
      server = createServer(router);
      server.listen(0, () => {
        port = (server.address() as AddressInfo).port;
        done();
      });
    });
    afterAll(() => {
      server.close();
      globalAgent.destroy();
    });
    runTests();
  });

  describe('uWebSockets', () => {
    const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
    if (nodeMajor < 16) {
      it('should be skipped', () => {});
      return;
    }
    let listenSocket: us_listen_socket;
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
    runTests();
  });

  function runTests() {
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
      expect(response.headers.get('content-type')).toBe('application/json');
      const json = await response.json();
      expect(json).toMatchInlineSnapshot(`
      {
        "components": {
          "schemas": {
            "Todo": {
              "additionalProperties": false,
              "properties": {
                "content": {
                  "type": "string",
                },
                "id": {
                  "type": "string",
                },
              },
              "required": [
                "id",
                "content",
              ],
              "type": "object",
            },
          },
        },
        "info": {
          "description": "A simple todo list example with feTS",
          "title": "Todo List Example",
          "version": "1.0.0",
        },
        "openapi": "3.0.1",
        "paths": {
          "/todo": {
            "put": {
              "description": "Add a todo",
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "additionalProperties": false,
                      "properties": {
                        "content": {
                          "type": "string",
                        },
                      },
                      "required": [
                        "content",
                      ],
                      "type": "object",
                    },
                  },
                },
              },
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Todo",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
          },
          "/todo/{id}": {
            "delete": {
              "description": "Delete a todo",
              "parameters": [
                {
                  "in": "path",
                  "name": "id",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "id",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "error": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "error",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
            "get": {
              "description": "Get a todo",
              "parameters": [
                {
                  "in": "path",
                  "name": "id",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Todo",
                      },
                    },
                  },
                  "description": "",
                },
                "404": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "message": {
                            "type": "string",
                          },
                        },
                        "type": "object",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
          },
          "/todos": {
            "get": {
              "description": "Get all todos",
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "$ref": "#/components/schemas/Todo",
                        },
                        "type": "array",
                      },
                    },
                  },
                  "description": "",
                },
              },
            },
          },
          "/upload": {
            "post": {
              "description": "Upload a file",
              "requestBody": {
                "content": {
                  "multipart/form-data": {
                    "schema": {
                      "additionalProperties": false,
                      "properties": {
                        "description": {
                          "maxLength": 255,
                          "type": "string",
                        },
                        "file": {
                          "format": "binary",
                          "type": "string",
                        },
                      },
                      "required": [
                        "file",
                      ],
                      "type": "object",
                    },
                  },
                },
              },
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "additionalProperties": false,
                        "properties": {
                          "description": {
                            "type": "string",
                          },
                          "lastModified": {
                            "type": "number",
                          },
                          "name": {
                            "type": "string",
                          },
                          "size": {
                            "type": "number",
                          },
                          "type": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "name",
                          "type",
                          "size",
                          "lastModified",
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
  }
});
