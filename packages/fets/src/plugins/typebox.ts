import { TypeCompiler, ValueError, ValueErrorIterator } from '@sinclair/typebox/compiler';
import { Response } from '../Response.js';
import { PromiseOrValue, RouterComponentsBase, RouterPlugin, RouterRequest } from '../types.js';
import { getHeadersObj } from './utils.js';

type ValidateRequestFn = (request: RouterRequest) => PromiseOrValue<ValueErrorIterator | []>;

export function useTypeBox({
  components = {},
}: {
  components?: RouterComponentsBase;
} = {}): RouterPlugin<any> {
  return {
    onRoute({ schemas, handlers }) {
      const validationMiddlewares = new Map<string, ValidateRequestFn>();
      if (schemas?.request?.headers) {
        const validator = TypeCompiler.Compile({
          ...schemas.request.headers,
          components,
        } as any);
        validationMiddlewares.set('headers', request => {
          const headersObj = getHeadersObj(request.headers);
          return validator.Errors(headersObj);
        });
      }
      if (schemas?.request?.params) {
        const validator = TypeCompiler.Compile({
          ...schemas.request.params,
          components,
        } as any);
        validationMiddlewares.set('params', request => {
          return validator.Errors(request.params);
        });
      }
      if (schemas?.request?.query) {
        const validator = TypeCompiler.Compile({
          ...schemas.request.query,
          components,
        } as any);
        validationMiddlewares.set('query', request => {
          return validator.Errors(request.query);
        });
      }
      if (schemas?.request?.json) {
        const validator = TypeCompiler.Compile({
          ...schemas.request.json,
          components,
        } as any);
        validationMiddlewares.set('json', async request => {
          const contentType = request.headers.get('content-type');
          if (contentType?.includes('json')) {
            const jsonObj = await request.json();
            Object.defineProperty(request, 'json', {
              value: async () => jsonObj,
              configurable: true,
            });
            return validator.Errors(jsonObj);
          }
          return [];
        });
      }
      if (schemas?.request?.formData) {
        const ajv = TypeCompiler.Compile({
          ...schemas.request.formData,
          components,
        } as any);
        validationMiddlewares.set('formData', async request => {
          const contentType = request.headers.get('content-type');
          if (
            contentType?.includes('multipart/form-data') ||
            contentType?.includes('application/x-www-form-urlencoded')
          ) {
            const formData = await request.formData();
            const formDataObj: Record<string, FormDataEntryValue> = {};
            const jobs: Promise<void>[] = [];
            formData.forEach((value, key) => {
              if (typeof value === 'string') {
                formDataObj[key] = value;
              } else {
                jobs.push(
                  value.arrayBuffer().then(buffer => {
                    const typedArray = new Uint8Array(buffer);
                    const binaryStrParts: string[] = [];
                    typedArray.forEach((byte, index) => {
                      binaryStrParts[index] = String.fromCharCode(byte);
                    });
                    formDataObj[key] = binaryStrParts.join('');
                  }),
                );
              }
            });
            await Promise.all(jobs);
            Object.defineProperty(request, 'formData', {
              value: async () => formData,
              configurable: true,
            });
            return ajv.Errors(formDataObj);
          }
          return [];
        });
      }
      if (validationMiddlewares.size > 0) {
        handlers.unshift(async (request): Promise<any> => {
          const validationErrorsNonFlat = await Promise.all(
            [...validationMiddlewares.entries()].map(async ([name, fn]) => {
              const errors = [...(await fn(request))];
              if (errors.length > 0) {
                return errors.map(({ schema, type, ...error }) => ({
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
    },
  };
}
