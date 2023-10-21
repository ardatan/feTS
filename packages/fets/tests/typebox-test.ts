import { Type } from '@sinclair/typebox';
import { createClient } from '../src/client';
import { createRouter } from '../src/createRouter';
import { Response } from '../src/Response';

const router = createRouter().route({
  path: '/user/:id',
  method: 'POST',
  schemas: {
    request: {
      json: Type.Object({
        name: Type.String(),
      }),
    },
    responses: {
      200: Type.Object({
        id: Type.String(),
        name: Type.String(),
      }),
      404: Type.Object({
        message: Type.String(),
      }),
    },
  },
  handler(req) {
    if (req.params.id !== '1') {
      return Response.json(
        {
          message: 'not found',
        },
        {
          status: 404,
        },
      );
    }
    return Response.json({
      id: '1',
      name: 'John',
    });
  },
});

const client = createClient<typeof router>({});

const res = await client['/user/:id'].post({
  params: {
    id: '1',
    // @ts-expect-error a is not a valid param
    a: 2,
  },
  json: {
    // @ts-expect-error name is a string
    name: 2,
  },
});

if (res.ok) {
  const successBody = await res.json();
  // @ts-expect-error message is not a valid property
  console.log(successBody.message);
} else {
  const errorBody = await res.json();
  // @ts-expect-error id is not a valid property
  console.log(errorBody.id);
}
