import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';
import { appRouter, createContext } from '../../server/router';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);

  // Handle incoming OpenAPI requests
  // TODO: Remove `as any` once trpc-openapi supports @trpc/server v11 (missing `getErrorShape` in Router type)
  return createOpenApiNextHandler({
    router: appRouter as any,
    createContext,
  })(req, res);
};

export default handler;
