import express from 'express';
import { createServerAdapter } from '@whatwg-node/server';
import { createRouter, Response, TypedRequestFromTypeConfig } from '../src';
import { TypedResponseWithJSONStatusMap } from '../src/typed-fetch';

const router = createRouter();
const adapter = createServerAdapter(() => new Response('Hello World'));

// express-compat
const app = express();
app.use('/fets', router);
app.use('/adapter', adapter);

type TestGetOpts = {
  request: {
    query: {
      id: string;
    };
    headers: {
      Authorization: `Bearer ${string}`;
    };
  };
  responses: {
    200: {
      id: string;
      name: string;
    };
    401: {
      code: string;
      message: string;
    };
    404: {
      message: string;
    };
  };
};

const handler = (
  request: TypedRequestFromTypeConfig<'GET', TestGetOpts>,
): TypedResponseWithJSONStatusMap<TestGetOpts['responses']> => {
  // @ts-expect-error - a is not defined in headers
  request.headers.set('a', '2');
  if (!request.headers.has('Authorization')) {
    return Response.json(
      {
        code: 'UNAUTHORIZED',
        message: 'Bearer token is missing',
      },
      {
        status: 401,
      },
    );
  }
  const id = request.parsedUrl.searchParams.get('id');
  // @ts-expect-error - name is not defined
  const name = request.parsedUrl.searchParams.get('name');
  if (id === 'only_available_id') {
    return Response.json(
      {
        id,
        name: `The only one`,
      },
      {
        status: 200,
      },
    );
  }
  // @ts-expect-error - message is string
  return Response.json(
    {
      message: 1,
    },
    {
      status: 404,
    },
  );
};

// custom types
router
  .route<TestGetOpts, 'GET'>({
    method: 'GET',
    path: '/pet',
    handler,
  })
  .route<{
    request: {
      json: {
        name: string;
      };
    };
    responses: {
      200: {
        id: string;
      };
      400: {
        message: string;
      };
    };
  }>({
    method: 'PUT',
    path: '/pet',
    async handler(request) {
      const a = await request.json();
      a.name = '2';
      // @ts-expect-error - name is string
      a.name = 2;
      if (a.name.length < 3) {
        return Response.json(
          {
            message: 'Name is invalid',
          },
          {
            status: 400,
          },
        );
      }
      return Response.json(
        {
          id: 'TEST_ID',
        },
        {
          status: 200,
        },
      );
    },
  });
