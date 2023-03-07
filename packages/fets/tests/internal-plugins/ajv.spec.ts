import { File, FormData } from '@whatwg-node/fetch';
import { createRouter, Response } from '../../src/index.js';

describe('AJV', () => {
  const router = createRouter().route({
    path: '/test',
    method: 'POST',
    schemas: {
      request: {
        json: {
          type: 'object',
          properties: {
            foo: {
              type: 'string',
            },
            bar: {
              type: 'number',
            },
          },
          additionalProperties: false,
          required: ['foo', 'bar'],
        },
        formData: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              maxLength: 10,
            },
            description: {
              type: 'string',
              minLength: 10,
            },
          },
          required: ['file', 'description'],
          additionalProperties: false,
        },
        headers: {
          type: 'object',
          properties: {
            authorization: {
              type: 'string',
              pattern: '^Bearer .+$',
            },
          },
          required: ['authorization'],
        },
      },
      responses: {
        200: {
          type: 'object',
          properties: {
            baz: {
              type: 'string',
            },
          },
          additionalProperties: false,
          required: ['baz'],
        },
      },
    } as const,
    handler() {
      return Response.json(
        {
          baz: '123',
          foo: 123,
        },
        {
          status: 200,
        },
      );
    },
  });
  it('should return errors correctly for json request', async () => {
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic 123',
      },
      body: JSON.stringify({
        foo: 123,
        bar: '123',
        baz: true,
      }),
    });

    const resultJson = await response.json();
    expect(resultJson).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "instancePath": "/authorization",
            "keyword": "pattern",
            "message": "must match pattern "^Bearer .+$"",
            "name": "headers",
            "params": {
              "pattern": "^Bearer .+$",
            },
            "schemaPath": "#/properties/authorization/pattern",
          },
          {
            "instancePath": "",
            "keyword": "additionalProperties",
            "message": "must NOT have additional properties",
            "name": "json",
            "params": {
              "additionalProperty": "baz",
            },
            "schemaPath": "#/additionalProperties",
          },
        ],
      }
    `);
    expect(response.status).toBe(400);
  });
  it('should return errors correctly for form data request', async () => {
    const formData = new FormData();
    formData.append('file', new File(['Hello World!'], 'hello.txt'));
    formData.append('description', 'HI!');
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
      body: formData,
    });
    const resultJson = await response.json();
    expect(resultJson).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'authorization'",
            "name": "headers",
            "params": {
              "missingProperty": "authorization",
            },
            "schemaPath": "#/required",
          },
          {
            "instancePath": "/file",
            "keyword": "maxLength",
            "message": "must NOT have more than 10 characters",
            "name": "formData",
            "params": {
              "limit": 10,
            },
            "schemaPath": "#/properties/file/maxLength",
          },
        ],
      }
    `);
    expect(response.status).toBe(400);
  });
  it('should not return extra responses', async () => {
    const response = await router.fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 123',
      },
      body: JSON.stringify({
        foo: '123',
        bar: 123,
      }),
    });
    const resultJson = await response.json();
    expect(resultJson).toStrictEqual({
      baz: '123',
    });
  });
});
