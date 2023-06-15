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
                "required": true,
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
                "required": true,
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
});
