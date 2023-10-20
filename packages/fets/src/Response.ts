import { Response as OriginalResponse } from '@whatwg-node/fetch';
import { StatusCode, TypedResponse, TypedResponseCtor } from './typed-fetch.js';

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
export const Response = OriginalResponse as TypedResponseCtor;

export type Response<
  TJSON = any,
  THeaders extends Record<string, string> = Record<string, string>,
  TStatusCode extends StatusCode = StatusCode,
> = TypedResponse<TJSON, THeaders, TStatusCode>;
