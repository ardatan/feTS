import { getHeadersObj } from '@whatwg-node/server';
import { Response } from '../Response.js';
import { PromiseOrValue, RouterPlugin, RouterRequest } from '../types.js';
import { isZodSchema } from './types.js';

type ZodError = {
  message: string;
}

type ValidateRequestFn = (request: RouterRequest) => PromiseOrValue<ZodError[]>;

export function useZod(): RouterPlugin<any> {
  return {
    onRoute({ schemas, handlers }) {
      if (schemas) {
        const validationMiddlewares = new Map<string, ValidateRequestFn>();
        const requestSchemas = schemas.request;
        if (requestSchemas) {
          if (isZodSchema(requestSchemas.headers)) {
            const headersSchema = requestSchemas.headers;
            validationMiddlewares.set('headers', request => {
              const headersObj = getHeadersObj(request.headers);
              const result = headersSchema.safeParse(headersObj);
              if (!result.success) {
                return result.error.issues;
              }
              return [];
            });
          }
          if (isZodSchema(requestSchemas.params)) {
            const paramsSchema = requestSchemas.params;
            validationMiddlewares.set('params', request => {
              const result = paramsSchema.safeParse(request.params);
              if (!result.success) {
                return result.error.issues;
              }
              return [];
            });
          }
          if (isZodSchema(requestSchemas.query)) {
            const querySchema = requestSchemas.query;
            validationMiddlewares.set('query', request => {
              const result = querySchema.safeParse(request.query);
              if (!result.success) {
                return result.error.issues;
              }
              return [];
            });
          }
          if (isZodSchema(requestSchemas.json)) {
            const jsonSchema = requestSchemas.json;
            validationMiddlewares.set('json', async request => {
              const contentType = request.headers.get('content-type');
              if (contentType?.includes('json')) {
                const jsonObj = await request.json();
                Object.defineProperty(request, 'json', {
                  value: async () => jsonObj,
                  configurable: true,
                });
                const result = jsonSchema.safeParse(jsonObj);
                if (!result.success) {
                  return result.error.issues;
                }
              }
              return [];
            });
          }
          if (validationMiddlewares.size > 0) {
            handlers.unshift(async (request): Promise<any> => {
              const validationErrorsNonFlat = await Promise.all(
                [...validationMiddlewares.entries()].map(async ([name, fn]) => {
                  const errors = await fn(request);
                  if (errors.length > 0) {
                    return errors.map(error => ({
                      name,
                      ...error,
                    }));
                  }
                }),
              );
              const validationErrors = validationErrorsNonFlat.flat().filter(Boolean);
              if (validationErrors.length > 0) {
                return Response.json(
                  {
                    errors: validationErrors,
                  },
                  {
                    status: 400,
                    headers: {
                      'x-error-type': 'validation',
                    },
                  },
                );
              }
            });
          }
        }
      }
    },
  };
}
