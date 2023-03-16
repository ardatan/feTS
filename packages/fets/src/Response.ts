import { Response as OriginalResponse } from '@whatwg-node/fetch';
import { TypedResponse, TypedResponseCtor } from './typed-fetch.js';
import { JSONSerializer } from './types.js';

export const LAZY_SERIALIZED_RESPONSE = Symbol('LAZY_SERIALIZED_RESPONSE');

export const defaultSerializer: JSONSerializer = obj => JSON.stringify(obj);

export interface LazySerializedResponse {
  [LAZY_SERIALIZED_RESPONSE]: true;
  resolveWithSerializer(serializer: JSONSerializer): void;
  init?: ResponseInit;
  serializerSet: boolean;
  responsePromise: Promise<Response>;
  jsonObj: any;
}

export function isLazySerializedResponse(response: any): response is LazySerializedResponse {
  return response != null && response[LAZY_SERIALIZED_RESPONSE];
}

export function createLazySerializedResponse(
  jsonObj: any,
  init?: ResponseInit,
): LazySerializedResponse {
  let resolve: (value: Response) => void;
  const promise = new Promise<Response>(_resolve => {
    resolve = _resolve;
  });
  let _serializerSet = false;
  return {
    jsonObj,
    responsePromise: promise,
    [LAZY_SERIALIZED_RESPONSE]: true,
    init,
    get serializerSet() {
      return _serializerSet;
    },
    resolveWithSerializer(serializer: JSONSerializer) {
      const serialized = serializer(jsonObj);
      _serializerSet = true;
      resolve(
        new OriginalResponse(serialized, {
          ...init,
          status: init?.status || 200,
          headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
          },
        }) as Response,
      );
    },
  };
}

// This allows us to hook into serialization of the response body
export const Response = new Proxy(OriginalResponse, {
  get(OriginalResponse, prop, receiver) {
    if (prop === 'json') {
      return createLazySerializedResponse;
    }
    return Reflect.get(OriginalResponse, prop, receiver);
  },
}) as TypedResponseCtor;

export type Response<
  TJSON = any,
  THeaders extends Record<string, string> = Record<string, string>,
  TStatusCode extends number = 200,
> = TypedResponse<TJSON, THeaders, TStatusCode>;
