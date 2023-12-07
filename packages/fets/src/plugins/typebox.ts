import { TSchema, TypeGuard } from '@sinclair/typebox';
import { TypeCompiler, ValueError, ValueErrorIterator } from '@sinclair/typebox/compiler';
import { Value } from '@sinclair/typebox/value';
import { HTTPError } from '@whatwg-node/server';
import { RouterComponentsBase, RouterPlugin } from '../types.js';
import { getHeadersObj } from './utils.js';

type ValidateFn = <T>(data: T) => ValueErrorIterator;

function createValidateFn(schema: TSchema): ValidateFn {
  try {
    const validator = TypeCompiler.Compile(schema);
    return function getErrors(data: TSchema['static']) {
      return validator.Errors(data);
    };
  } catch (e) {
    return function getErrors(data: TSchema['static']) {
      return Value.Errors(schema, data);
    };
  }
}

function sanitizeError({ schema, type, ...error }: ValueError, name: string) {
  return {
    ...error,
    name,
  };
}

export function useTypeBox<TServerContext, TComponents extends RouterComponentsBase>({
  components = {} as TComponents,
}: {
  components?: TComponents;
} = {}): RouterPlugin<TServerContext, TComponents> {
  const validateFnBySchema = new WeakMap<any, ValidateFn>();

  function getValidateFn(schema: any) {
    let validateFn = validateFnBySchema.get(schema);
    if (!validateFn) {
      validateFn = createValidateFn({
        ...schema,
        components,
      });
      validateFnBySchema.set(schema, validateFn);
    }
    return validateFn;
  }
  return {
    onRouteHandle({ route: { schemas }, request }) {
      if (schemas?.request?.headers && TypeGuard.TSchema(schemas.request.headers)) {
        const validateFn = getValidateFn(schemas.request.headers);
        const headersObj = getHeadersObj(request.headers as any);
        const errors = [...validateFn(headersObj)].map(error => sanitizeError(error, 'headers'));
        if (errors.length) {
          throw new HTTPError(
            400,
            'Bad Request',
            {
              'x-error-type': 'validation',
            },
            {
              errors,
            },
          );
        }
      }
      if (schemas?.request?.params && TypeGuard.TSchema(schemas.request.params)) {
        const validateFn = getValidateFn(schemas.request.params);
        const errors = [...validateFn(request.params)].map(error => sanitizeError(error, 'params'));
        if (errors.length) {
          throw new HTTPError(
            400,
            'Bad Request',
            {
              'x-error-type': 'validation',
            },
            {
              errors,
            },
          );
        }
      }
      if (schemas?.request?.query && TypeGuard.TSchema(schemas.request.query)) {
        const validateFn = getValidateFn(schemas.request.query);
        const errors = [...validateFn(request.query)].map(error => sanitizeError(error, 'query'));
        if (errors.length) {
          throw new HTTPError(
            400,
            'Bad Request',
            {
              'x-error-type': 'validation',
            },
            {
              errors,
            },
          );
        }
      }
      if (schemas?.request?.json && TypeGuard.TSchema(schemas.request.json)) {
        const validateFn = getValidateFn(schemas.request.json);
        const origReqJsonMethod = request.json.bind(request);
        Object.defineProperty(request, 'json', {
          value: () =>
            origReqJsonMethod().then(jsonObj => {
              const errors = [...validateFn(jsonObj)].map(({ schema, type, ...error }) => ({
                name: 'json',
                ...error,
              }));
              if (errors.length) {
                throw new HTTPError(
                  400,
                  'Bad Request',
                  {
                    'x-error-type': 'validation',
                  },
                  {
                    errors,
                  },
                );
              }
              return jsonObj;
            }),
          configurable: true,
        });
      }
      if (schemas?.request?.formData && TypeGuard.TSchema(schemas.request.formData)) {
        const validateFn = getValidateFn(schemas.request.formData);
        const origMethod = request.formData.bind(request);
        Object.defineProperty(request, 'formData', {
          configurable: true,
          value: () =>
            origMethod().then(async formData => {
              const formDataObj: Record<string, FormDataEntryValue> = {};
              const jobs: Promise<void>[] = [];
              formData.forEach((value, key) => {
                if (value != null) {
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
                }
              });
              await Promise.all(jobs);
              const errors = [...validateFn(formDataObj)].map(error =>
                sanitizeError(error, 'formData'),
              );
              if (errors.length) {
                throw new HTTPError(
                  400,
                  'Bad Request',
                  {
                    'x-error-type': 'validation',
                  },
                  {
                    errors,
                  },
                );
              }
              return formDataObj;
            }),
        });
      }
    },
  };
}
