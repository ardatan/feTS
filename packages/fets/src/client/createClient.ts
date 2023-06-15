import { fetch, URLSearchParams } from '@whatwg-node/fetch';
import { HTTPMethod } from '../typed-fetch.js';
import { OpenAPIDocument, Router } from '../types.js';
import {
  ClientMethod,
  ClientOptions,
  ClientPlugin,
  ClientRequestParams,
  OASClient,
  OnFetchHook,
  OnRequestInitHook,
  OnResponseHook,
} from './types.js';

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

export function createClient<TRouter extends Router<any, any, any>>(
  options?: ClientOptions,
): TRouter['__client'];
export function createClient<TOAS extends OpenAPIDocument>(
  options: Omit<ClientOptions, 'endpoint'> & TOAS extends {
    servers: { url: infer TEndpoint extends string }[];
  }
    ? { endpoint: TEndpoint }
    : { endpoint?: string },
): OASClient<TOAS>;
export function createClient({ endpoint, fetchFn = fetch, plugins = [] }: ClientOptions = {}) {
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
  return new Proxy({} as any, {
    get(_target, path: string) {
      return new Proxy({} as any, {
        get(_target, method: HTTPMethod): ClientMethod {
          return async function (requestParams: ClientRequestParams = {}) {
            for (const pathParamKey in requestParams?.params || {}) {
              const value = requestParams?.params?.[pathParamKey];
              if (value) {
                path = path.replace(`{${pathParamKey}}`, value).replace(`:${pathParamKey}`, value);
              }
            }
            if (!path.startsWith('/')) {
              path = `/${path}`;
            }
            let searchParams: URLSearchParams | undefined;
            if (requestParams?.query) {
              searchParams = new URLSearchParams();
              for (const queryParamKey in requestParams?.query || {}) {
                const value = requestParams?.query?.[queryParamKey];
                if (value) {
                  if (Array.isArray(value)) {
                    for (const v of value) {
                      searchParams.append(queryParamKey, v);
                    }
                  } else {
                    searchParams.append(queryParamKey, value);
                  }
                }
              }
            }
            const requestInit: RequestInit & { headers: Record<string, string> } = {
              method,
              headers: requestParams?.headers || {},
            };

            if (requestParams?.json) {
              requestInit.body = JSON.stringify(requestParams.json);
              requestInit.headers['Content-Type'] = 'application/json';
            }

            if (requestParams?.formData) {
              requestInit.body = requestParams.formData;
            }

            let response: Response;
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

            let finalUrl = path;
            if (endpoint) {
              finalUrl = `${endpoint}${path}`;
            }
            if (searchParams) {
              if (finalUrl.includes('?')) {
                finalUrl += '&' + searchParams.toString();
              } else {
                finalUrl += '?' + searchParams.toString();
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

            response ||= await currentFetchFn(finalUrl, requestInit);

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
          };
        },
      });
    },
  });
}
