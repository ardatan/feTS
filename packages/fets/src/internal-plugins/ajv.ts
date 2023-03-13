import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import jsonSerializerFactory from '@ardatan/fast-json-stringify';
import { URL } from '@whatwg-node/fetch';
import { getHeadersObj } from '@whatwg-node/server';
import { Response } from '../Response.js';
import {
  JSONSerializer,
  PromiseOrValue,
  RouterComponentsBase,
  RouterPlugin,
  RouterRequest,
} from '../types.js';

type ValidateRequestFn = (request: RouterRequest) => PromiseOrValue<ErrorObject[]>;

export function useAjv({
  components = {},
}: {
  components?: RouterComponentsBase;
} = {}): RouterPlugin<any> {
  const ajv = new Ajv({
    strict: false,
    strictSchema: false,
    validateSchema: false,
    allowUnionTypes: true,
    uriResolver: {
      parse(uri: string) {
        const url = new URL(uri);
        return {
          scheme: url.protocol,
          userinfo: url.username + (url.password ? ':' + url.password : ''),
          host: url.hostname,
          port: url.port,
          path: url.pathname,
          query: url.search,
          fragment: url.hash,
        };
      },
      resolve(base: string, ref: string) {
        return new URL(ref, base).toString();
      },
      serialize(components) {
        return (
          components.scheme +
          '://' +
          components.userinfo +
          components.host +
          components.port +
          components.path +
          components.query +
          components.fragment
        );
      },
    },
  });
  addFormats(ajv);
  // Required for fast-json-stringify
  ajv.addKeyword({
    keyword: 'fjs_type',
    type: 'object',
    errors: false,
    validate: (_type: unknown, date: unknown) => {
      return date instanceof Date;
    },
  });

  const serializersByCtx = new WeakMap<any, Map<number, JSONSerializer>>();
  return {
    onRoute({ schemas, handlers }) {
      const validationMiddlewares = new Map<string, ValidateRequestFn>();
      if (schemas?.request?.headers) {
        const validateFn = ajv.compile({
          ...schemas.request.headers,
          components,
        });
        validationMiddlewares.set('headers', request => {
          const headersObj = getHeadersObj(request.headers);
          const isValid = validateFn(headersObj);
          if (!isValid) {
            return validateFn.errors!;
          }
          return [];
        });
      }
      if (schemas?.request?.params) {
        const validateFn = ajv.compile({
          ...schemas.request.params,
          components,
        });
        validationMiddlewares.set('params', request => {
          const isValid = validateFn(request.params);
          if (!isValid) {
            return validateFn.errors!;
          }
          return [];
        });
      }
      if (schemas?.request?.query) {
        const validateFn = ajv.compile({
          ...schemas.request.query,
          components,
        });
        validationMiddlewares.set('query', request => {
          const isValid = validateFn(request.query);
          if (!isValid) {
            return validateFn.errors!;
          }
          return [];
        });
      }
      if (schemas?.request?.json) {
        const validateFn = ajv.compile({
          ...schemas.request.json,
          components,
        });
        validationMiddlewares.set('json', async request => {
          const contentType = request.headers.get('content-type');
          if (contentType?.includes('json')) {
            const jsonObj = await request.json();
            Object.defineProperty(request, 'json', {
              value: async () => jsonObj,
              configurable: true,
            });
            const isValid = validateFn(jsonObj);
            if (!isValid) {
              return validateFn.errors!;
            }
          }
          return [];
        });
      }
      if (schemas?.request?.formData) {
        const validateFn = ajv.compile({
          ...schemas.request.formData,
          components,
        });
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
            const isValid = validateFn(formDataObj);
            if (!isValid) {
              return validateFn.errors!;
            }
          }
          return [];
        });
      }
      if (jsonSerializerFactory && schemas?.responses) {
        const serializerByStatusCode = new Map<number, JSONSerializer>();
        for (const statusCode in schemas.responses) {
          const schema = schemas.responses[statusCode];
          const serializer = jsonSerializerFactory(
            {
              ...schema,
              components,
            } as any,
            {
              ajv,
            },
          );
          serializerByStatusCode.set(Number(statusCode), serializer);
        }
        handlers.unshift((_request, ctx) => {
          serializersByCtx.set(ctx, serializerByStatusCode);
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
          const validationErrors = validationErrorsNonFlat.flat().filter(Boolean) as ErrorObject[];
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
    onSerializeResponse({ serverContext, lazyResponse }) {
      const serializers = serializersByCtx.get(serverContext);
      if (serializers) {
        const serializer = serializers.get(lazyResponse.init?.status || 200);
        if (serializer) {
          lazyResponse.resolveWithSerializer(serializer);
        }
      }
    },
  };
}
