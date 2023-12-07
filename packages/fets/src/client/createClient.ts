import { stringify as qsStringify, type IStringifyOptions } from 'qs';
import { fetch, FormData } from '@whatwg-node/fetch';
import { HTTPMethod } from '../typed-fetch.js';
import { OpenAPIDocument, Router } from '../types.js';
import { createClientTypedResponsePromise } from './clientResponse.js';
import {
  ClientMethod,
  ClientOptions,
  ClientOptionsWithStrictEndpoint,
  ClientPlugin,
  ClientRequestParams,
  OASClient,
  OnFetchHook,
  OnRequestInitHook,
  OnResponseHook,
} from './types.js';

const qsOptions: IStringifyOptions = {
  indices: false,
  arrayFormat: 'repeat',
};

export class ClientValidationError extends Error implements AggregateError {
  constructor(
    public readonly path: string,
    public readonly method: HTTPMethod,
    public errors: any[],
    public response: Response,
  ) {
    super(`Validation failed for ${method} ${path}`);
  }

  [Symbol.iterator]() {
    return this.errors[Symbol.iterator]();
  }
}

function useValidationErrors(): ClientPlugin {
  return {
    async onResponse({ path, method, response }) {
      if (response.status === 400 && response.headers.get('x-error-type') === 'validation') {
        const resJson = await response.json();
        if (resJson.errors) {
          throw new ClientValidationError(path, method, resJson.errors, response);
        }
      }
    },
  };
}

const EMPTY_OBJECT = {};

/**
 * Create a client for an OpenAPI document
 * You need to pass the imported OpenAPI document as a generic
 *
 * We recommend using the `NormalizeOAS` type to normalize the OpenAPI document
 *
 * @see https://the-guild.dev/openapi/fets/client/quick-start#usage-with-existing-rest-api
 *
 * @example
 * ```ts
 * import { createClient, type NormalizeOAS } from 'fets';
 * import type oas from './oas.ts';
 *
 * const client = createClient<NormalizeOAS<typeof oas>>({});
 * ```
 */
export function createClient<const TOAS extends OpenAPIDocument>(
  options: ClientOptionsWithStrictEndpoint<TOAS>,
): OASClient<TOAS>;
/**
 * Create a client from a typed `Router`
 *
 * @see https://the-guild.dev/openapi/fets/client/quick-start#usage-with-fets-server
 */
export function createClient<const TRouter extends Router<any, any, any>>(
  options: ClientOptions,
): TRouter['__client'];
export function createClient({ endpoint, fetchFn = fetch, plugins = [] }: ClientOptions) {
  plugins.unshift(useValidationErrors());
  const onRequestInitHooks: OnRequestInitHook[] = [];
  const onFetchHooks: OnFetchHook[] = [];
  const onResponseHooks: OnResponseHook[] = [];
  for (const plugin of plugins) {
    if (plugin.onRequestInit) {
      onRequestInitHooks.push(plugin.onRequestInit);
    }
    if (plugin.onFetch) {
      onFetchHooks.push(plugin.onFetch);
    }
    if (plugin.onResponse) {
      onResponseHooks.push(plugin.onResponse);
    }
  }
  return new Proxy(EMPTY_OBJECT, {
    get(_target, path: string) {
      return new Proxy(EMPTY_OBJECT, {
        get(_target, method: HTTPMethod): ClientMethod {
          async function clientMethod(requestParams: ClientRequestParams = {}) {
            const {
              headers = {},
              params: paramsBody,
              json: jsonBody,
              formData: formDataBody,
              formUrlEncoded: formUrlEncodedBody,
              query: queryBody,
              ...requestInitByUser
            } = requestParams;

            if (paramsBody) {
              for (const pathParamKey in paramsBody) {
                const value = paramsBody[pathParamKey];
                if (value) {
                  path = path
                    .replace(`{${pathParamKey}}`, value)
                    .replace(`:${pathParamKey}`, value);
                }
              }
            }
            if (!path.startsWith('/') && !path.startsWith('http')) {
              path = `/${path}`;
            }

            const requestInit: RequestInit & { headers: Record<string, string> } = {
              ...requestInitByUser,
              method,
              headers,
            };

            if (jsonBody) {
              requestInit.body = JSON.stringify(jsonBody);
              headers['Content-Type'] = 'application/json';
            }

            if (formDataBody) {
              requestInit.body = new FormData();
              for (const key in formDataBody) {
                const value = formDataBody[key];
                if (value != null) {
                  requestInit.body.append(key, value);
                }
              }
            }

            if (formUrlEncodedBody) {
              requestInit.body = qsStringify(formUrlEncodedBody, qsOptions);
              requestInit.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }

            let response: Response | undefined;
            for (const onRequestParamsHook of onRequestInitHooks) {
              await onRequestParamsHook({
                path,
                method,
                requestParams,
                requestInit,
                endResponse(res) {
                  response = res;
                },
              });
            }

            if (response == null) {
              let finalUrl = path;
              if (endpoint && !path.startsWith('http')) {
                finalUrl = `${endpoint}${path}`;
              }
              if (queryBody) {
                const searchParams = qsStringify(queryBody, qsOptions);
                if (finalUrl.includes('?')) {
                  finalUrl += '&' + searchParams;
                } else {
                  finalUrl += '?' + searchParams;
                }
              }

              let currentFetchFn = fetchFn;

              for (const onFetchHook of onFetchHooks) {
                await onFetchHook({
                  url: finalUrl,
                  init: requestInit as RequestInit,
                  fetchFn: currentFetchFn,
                  setFetchFn(newFetchFn) {
                    currentFetchFn = newFetchFn;
                  },
                });
              }

              response = await currentFetchFn(finalUrl, requestInit);
            }

            for (const onResponseHook of onResponseHooks) {
              await onResponseHook({
                path,
                method,
                requestParams,
                requestInit,
                response,
              });
            }

            return response;
          }
          return function wrappedClientMethod(requestParams: ClientRequestParams = {}) {
            return createClientTypedResponsePromise(clientMethod(requestParams));
          };
        },
      });
    },
  });
}
