import { JSONofResponse, TypedResponse } from '../typed-fetch';

export type ClientTypedResponsePromise<TTypedResponse extends Response> =
  Promise<TTypedResponse> & {
    json(): Promise<TTypedResponse extends TypedResponse ? JSONofResponse<TTypedResponse> : any>;
  };

export function createClientTypedResponsePromise<TTypedResponse extends Response>(
  response$: Promise<TTypedResponse>,
): ClientTypedResponsePromise<TTypedResponse> {
  return new Proxy(response$, {
    get(target, key, receiver) {
      if (key === 'json') {
        return () => target.then(res => res.json());
      }
      const value = Reflect.get(target, key, receiver);
      if (typeof value === 'function') {
        return value.bind(target);
      }
      return value;
    },
    has(target, key) {
      if (key === 'json') {
        return true;
      }
      return Reflect.has(target, key);
    },
  }) as any;
}
