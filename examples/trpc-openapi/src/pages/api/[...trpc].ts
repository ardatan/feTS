import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';
import { appRouter, createContext } from '../../server/router';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    // @ts-expect-error - somehow the types are not matching, but it works fine
    router: appRouter,
    // @ts-expect-error - somehow the types are not matching, but it works fine
    createContext,
  })(req, res);
};

export default handler;
