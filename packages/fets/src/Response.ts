import { Response as OriginalResponse } from '@whatwg-node/fetch';
import { fakePromise } from '@whatwg-node/server';
import { StatusCode, TypedResponse, TypedResponseCtor } from './typed-fetch.js';
import { JSONSerializer } from './types.js';

export const LAZY_SERIALIZED_RESPONSE = Symbol('LAZY_SERIALIZED_RESPONSE');
export const defaultSerializer: JSONSerializer = obj => JSON.stringify(obj);
export interface LazySerializedResponse {
  [LAZY_SERIALIZED_RESPONSE]: true;
  resolveWithSerializer(serializer: JSONSerializer): void;
  init?: ResponseInit;
  actualResponse: Response;
  jsonObj: any;
  json: () => Promise<any>;
  status: StatusCode;
  headers: Headers;
}
export function isLazySerializedResponse(response: any): response is LazySerializedResponse {
  return response[LAZY_SERIALIZED_RESPONSE];
}
function isHeadersLike(headers: any): headers is Headers {
  return headers?.get && headers?.forEach;
}
const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';
function getHeadersFromHeadersInit(init?: HeadersInit): Headers {
  let headers: Headers;
  if (isHeadersLike(init)) {
    headers = init;
  } else {
    headers = new Headers(init);
  }
  if (!headers.has('content-type')) {
    headers.set('content-type', JSON_CONTENT_TYPE);
  }
  return headers;
}
export function createLazySerializedResponse(
  jsonObj: any,
  init: ResponseInit = {},
): LazySerializedResponse {
  let actualResponse: Response;
  let headers: Headers;
  function getHeaders() {
    if (headers == null) {
      headers = getHeadersFromHeadersInit(init.headers);
    }
    return headers;
  }
  return {
    jsonObj,
    get actualResponse() {
      return actualResponse;
    },
    [LAZY_SERIALIZED_RESPONSE]: true,
    init,
    resolveWithSerializer(serializer: JSONSerializer) {
      const serialized = serializer(jsonObj);
      init.headers = getHeaders();
      actualResponse = new OriginalResponse(serialized, init) as Response;
    },
    json() {
      return fakePromise(jsonObj);
    },
    get status() {
      return (init?.status || 200) as StatusCode;
    },
    get headers() {
      return getHeaders();
    },
  };
}

// This allows us to hook into serialization of the response body
/**
 * The Response interface of the Fetch API represents the response to a request.
 * It contains the status of the response, as well as the response headers, and
 * an optional response body.
 *
 * @param body An object defining a body for the response. This can be null (which is the default value), or a Blob, BufferSource, FormData, Node.js Readable stream, URLSearchParams, or USVString object. The USVString is handled as UTF-8.
 * @param options An options object containing any custom settings that you want to apply to the response, or an empty object (which is the default value).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
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
