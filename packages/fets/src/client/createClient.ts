/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import { fetch } from '@whatwg-node/fetch';
import { HTTPMethod } from '../typed-fetch';
import { Router } from '../types';
import { ClientMethod, ClientOptions, ClientRequestParams, OASClient } from './types';

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

export function createClient<TRouter extends Router<any, any>>(
  options?: ClientOptions,
): TRouter['__client'];
export function createClient<TOAS extends OpenAPIV3_1.Document>(
  options?: ClientOptions,
): OASClient<TOAS>;
export function createClient({ endpoint, fetchFn = fetch }: ClientOptions = {}) {
  return new Proxy({} as any, {
    get(_target, path: string) {
      return new Proxy({} as any, {
        get(_target, method: HTTPMethod): ClientMethod {
          return function (requestParams?: ClientRequestParams) {
            const url = new URL(path, endpoint);
            for (const pathParamKey in requestParams?.params || {}) {
              const value = requestParams?.params?.[pathParamKey];
              if (value) {
                url.pathname = url.pathname.replace(`{${pathParamKey}}`, value);
              }
            }
            for (const queryParamKey in requestParams?.query || {}) {
              const value = requestParams?.query?.[queryParamKey];
              if (value) {
                if (Array.isArray(value)) {
                  value.forEach(v => url.searchParams.append(queryParamKey, v));
                } else {
                  url.searchParams.append(queryParamKey, value);
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

            return fetchFn(url, requestInit).then(async res => {
              if (res.status === 400 && res.headers.get('x-error-type') === 'validation') {
                const resJson = await res.json();
                if (resJson.errors) {
                  throw new ClientValidationError(path, method, resJson.errors, res);
                }
              }
              return res;
            });
          };
        },
      });
    },
  });
}
