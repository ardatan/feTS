import { createRouter, Response } from 'fets';
import z from 'zod';

describe('zod', () => {
  const router = createRouter().route({
    path: '/test',
    method: 'POST',
    schemas: {
      request: {
        json: z.object({
          foo: z.string(),
          bar: z.number(),
        }),
        headers: z.object({
          authorization: z
            .string({
              required_error: 'Missing authorization header',
            })
            .startsWith('Bearer ', { message: 'Invalid authorization header' }),
        }),
      },
    },
    async handler() {
      return Response.json({
        message: 'ok',
      });
    },
  });

  it('should validate request body', async () => {
    const response = await router.fetch('/test', {
      method: 'POST',
      body: JSON.stringify({
        foo: 'foo',
      }),
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer 123',
      },
    });
    const json = await response.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "code": "invalid_type",
            "expected": "number",
            "message": "Required",
            "name": "json",
            "path": [
              "bar",
            ],
            "received": "undefined",
          },
        ],
      }
    `);
  });
  it('should validate request headers', async () => {
    const response = await router.fetch('/test', {
      method: 'POST',
      body: JSON.stringify({
        foo: 'foo',
        bar: 123,
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await response.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "code": "invalid_type",
            "expected": "string",
            "message": "Missing authorization header",
            "name": "headers",
            "path": [
              "authorization",
            ],
            "received": "undefined",
          },
        ],
      }
    `);
  });
  it('should generate correct openapi', async () => {
    const response = await router.fetch('/openapi.json');
    const json = await response.json();
    expect(json).toMatchInlineSnapshot(`
      {
        "components": {},
        "info": {
          "description": "An API written with feTS",
          "title": "feTS API",
          "version": "1.0.0",
        },
        "openapi": "3.0.1",
        "paths": {
          "/test": {
            "post": {
              "parameters": [
                {
                  "in": "header",
                  "name": "authorization",
                  "required": true,
                  "schema": {
                    "pattern": "^Bearer\\ ",
                    "type": "string",
                  },
                },
              ],
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "properties": {
                        "bar": {
                          "type": "number",
                        },
                        "foo": {
                          "type": "string",
                        },
                      },
                      "required": [
                        "foo",
                        "bar",
                      ],
                      "type": "object",
                    },
                  },
                },
              },
              "responses": {
                "default": {
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
