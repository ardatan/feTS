import { Headers, Response as OriginalResponse } from '@whatwg-node/fetch';
import { StatusCode, TypedResponse, TypedResponseCtor } from './typed-fetch.js';
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
  json: () => Promise<any>;
  status: StatusCode;
  headers: Headers;
}

export function isLazySerializedResponse(response: any): response is LazySerializedResponse {
  return response != null && response[LAZY_SERIALIZED_RESPONSE];
}

function isHeadersLike(headers: any): headers is Headers {
  return headers.get && headers.forEach;
}

function getHeadersFromHeadersInit(init?: HeadersInit): Headers {
  let headers: Headers;
  if (init != null && isHeadersLike(init)) {
    headers = init;
  } else {
    headers = new Headers(init);
  }
  headers.set('content-type', 'application/json');
  return headers;
}

export function createLazySerializedResponse(
  jsonObj: any,
  init: ResponseInit = {},
): LazySerializedResponse {
  let resolve: (value: Response) => void;
  const promise = new Promise<Response>(_resolve => {
    resolve = _resolve;
  });
  let _serializerSet = false;
  let headers: Headers;
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
      init.headers = getHeadersFromHeadersInit(init.headers);
      resolve(new OriginalResponse(serialized, init) as Response);
    },
    async json() {
      return jsonObj;
    },
    get status() {
      return (init?.status || 200) as StatusCode;
    },
    get headers() {
      if (headers == null) {
        headers = getHeadersFromHeadersInit(init.headers);
      }
      return headers;
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
  TStatusCode extends StatusCode = StatusCode,
> = TypedResponse<TJSON, THeaders, TStatusCode>;
