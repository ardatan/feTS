import { StatusCodeMap } from './types';

export type OkStatusCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

type RedirectStatusCode = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;

type ClientErrorStatusCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;

type ServerErrorStatusCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

export type StatusCode =
  | OkStatusCode
  | RedirectStatusCode
  | ClientErrorStatusCode
  | ServerErrorStatusCode;

export type NotOkStatusCode = Exclude<StatusCode, OkStatusCode>;

export type TypedBody<
  TJSON,
  TFormData extends Record<string, FormDataEntryValue>,
  THeaders extends Record<string, string>,
> = Omit<Body, 'json' | 'formData' | 'headers'> & {
  /**
   * The `json()` method takes the stream and reads it to completion.
   * It returns a promise which resolves with the result of parsing the body text as JSON.
   *
   * Note that despite the method being named `json()`, the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/json
   */
  json(): Promise<TJSON>;
  /**
   * The formData() method takes the stream and reads it to completion. It returns a promise that resolves with a `FormData` object.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/formData
   */
  formData(): Promise<TypedFormData<TFormData>>;
  /**
   * The headers read-only property of the Response interface contains the Headers object associated with the response.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/headers
   */
  headers: TypedHeaders<THeaders>;
};

type DefaultHTTPHeaders =
  | 'accept'
  | 'accept-language'
  | 'content-language'
  | 'content-type'
  | 'content-length';

type Maybe = undefined | null;

type UndefinedToNull<T> = T extends undefined ? Exclude<T, undefined> | null : T;

export type TypedHeaders<TMap extends Record<string, string>> = {
  append<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
    value: TName extends keyof TMap ? TMap[TName] : string,
  ): void;
  delete<TName extends DefaultHTTPHeaders | keyof TMap>(name: TName): void;
  get<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
  ): TName extends keyof TMap
    ? UndefinedToNull<TMap[TName]>
    : TName extends DefaultHTTPHeaders
    ? string | null
    : never;
  has<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
  ): TName extends DefaultHTTPHeaders
    ? boolean
    : TName extends keyof TMap
    ? TMap[TName] extends Maybe
      ? boolean
      : true
    : never;
  set<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
    value: TName extends keyof TMap ? TMap[TName] : string,
  ): void;
  forEach(
    callbackfn: <TName extends keyof TMap>(
      value: TMap[TName],
      key: TName,
      parent: TypedHeaders<TMap>,
    ) => void,
    thisArg?: any,
  ): void;
  entries(): IterableIterator<[keyof TMap, TMap[keyof TMap]]>;
  keys(): IterableIterator<keyof TMap>;
  values(): IterableIterator<TMap[keyof TMap]>;
  [Symbol.iterator](): IterableIterator<[keyof TMap, TMap[keyof TMap]]>;
};

export type TypedHeadersCtor = new <TMap extends Record<string, string>>(
  init?: TMap | undefined,
) => TypedHeaders<TMap>;

export type TypedResponseInit<TStatusCode extends StatusCode = 200> = Omit<
  ResponseInit,
  'status' | 'statusText'
> & {
  /**
   * This is the status code that will be set in the response.
   * For example, 200 for success, 404 if the resource could not be found.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/status
   */
  status: TStatusCode;
  /**
   * This is the status message that will be set in the response.
   * You don't need to set this value if it's a standard message.
   * For example, this would be OK for a status code 200, Continue for 100, Not Found for 404.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
   */
  statusText?:
    | (TStatusCode extends keyof StatusTextMap ? StatusTextMap[TStatusCode] : string)
    | undefined;
};

export type StatusTextMap = {
  100: 'Continue';
  101: 'Switching Protocols';
  102: 'Processing';
  103: 'Early Hints';
  200: 'OK';
  201: 'Created';
  202: 'Accepted';
  203: 'Non-Authoritative Information';
  204: 'No Content';
  205: 'Reset Content';
  206: 'Partial Content';
  207: 'Multi-Status';
  208: 'Already Reported';
  226: 'IM Used';
  300: 'Multiple Choices';
  301: 'Moved Permanently';
  302: 'Found';
  303: 'See Other';
  304: 'Not Modified';
  305: 'Use Proxy';
  307: 'Temporary Redirect';
  308: 'Permanent Redirect';
  400: 'Bad Request';
  401: 'Unauthorized';
  402: 'Payment Required';
  403: 'Forbidden';
  404: 'Not Found';
  405: 'Method Not Allowed';
  406: 'Not Acceptable';
  407: 'Proxy Authentication Required';
  408: 'Request Timeout';
  409: 'Conflict';
  410: 'Gone';
  411: 'Length Required';
  412: 'Precondition Failed';
  413: 'Payload Too Large';
  414: 'URI Too Long';
  415: 'Unsupported Media Type';
  416: 'Range Not Satisfiable';
  417: 'Expectation Failed';
  418: "I'm a Teapot";
  421: 'Misdirected Request';
  422: 'Unprocessable Entity';
  423: 'Locked';
  424: 'Failed Dependency';
  425: 'Too Early';
  426: 'Upgrade Required';
  428: 'Precondition Required';
  429: 'Too Many Requests';
  431: 'Request Header Fields Too Large';
  451: 'Unavailable For Legal Reasons';
  500: 'Internal Server Error';
  501: 'Not Implemented';
  502: 'Bad Gateway';
  503: 'Service Unavailable';
  504: 'Gateway Timeout';
  505: 'HTTP Version Not Supported';
  506: 'Variant Also Negotiates';
  507: 'Insufficient Storage';
  508: 'Loop Detected';
  509: 'Bandwidth Limit Exceeded';
  510: 'Not Extended';
  511: 'Network Authentication Required';
};

export type TypedResponse<
  TJSON = unknown,
  THeaders extends Record<string, string> = Record<string, string>,
  TStatusCode extends StatusCode = StatusCode,
> = Omit<Response, 'json' | 'status' | 'ok'> &
  Omit<TypedBody<TJSON, any, THeaders>, 'formData'> & {
    /**
     * The status read-only property of the Response interface contains the HTTP status codes of the response.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/status
     *
     * You can use `Response.ok` to check if the status is in the range 200-299.
     */
    status: TStatusCode;
    /**
     * The statusText read-only property of the Response interface contains the status message corresponding to the HTTP status code in Response.status.
     * For example, this would be OK for a status code 200, Continue for 100, Not Found for 404.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
     */
    statusText: TStatusCode extends keyof StatusTextMap ? StatusTextMap[TStatusCode] : string;
  } & {
    /**
     * The ok read-only property of the Response interface contains a Boolean stating whether the response was successful (status in the range 200-299) or not.
     */
    ok: TStatusCode extends OkStatusCode ? true : false;
  };

export type TypedResponseCtor = Omit<typeof Response, 'json'> & {
  new <TStatusCode extends StatusCode = 200>(
    body: BodyInit | null | undefined,
    init: (TypedResponseInit<TStatusCode> & { status: TStatusCode }) | undefined,
  ): TypedResponse<any, Record<string, string>, TStatusCode>;
  new (
    body: BodyInit | null | undefined,
    init: ResponseInit | undefined,
  ): TypedResponse<any, Record<string, string>, 200>;
  new (body?: BodyInit | null | undefined): TypedResponse<any, Record<string, string>, 200>;

  /**
   * The `json()` static method of the `Response` interface returns a `Response` that contains the provided JSON data as body,
   * and a `Content-Type` header which is set to `application/json`. The response status, status message, and additional headers can also be set.
   * @param data The JSON data to be used as the response body.
   * @param options An options object containing settings for the response, including the status code, status text, and headers. This is the same as the options parameter of the `Response()` constructor.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
   */
  json<TJSON, TStatusCode extends StatusCode>(
    data: TJSON,
    options: TypedResponseInit<TStatusCode>,
  ): TypedResponse<TJSON, Record<string, string>, TStatusCode>;
  /**
   * The `json()` static method of the `Response` interface returns a `Response` that contains the provided JSON data as body,
   * and a `Content-Type` header which is set to `application/json`.
   * @param data The JSON data to be used as the response body.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
   */
  json<TJSON>(data: TJSON): TypedResponse<TJSON, Record<string, string>, 200>;

  /**
   * The redirect() static method of the Response interface returns a Response resulting in a redirect to the specified URL.
   * @param url The URL that the new response is to originate from.
   * @param status An optional status code for the response (e.g., 302.)
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect_static
   */
  redirect<TStatusCode extends StatusCode>(
    url: string | URL,
    status: TStatusCode,
  ): TypedResponse<any, Record<string, string>, TStatusCode>;

  /**
   * The redirect() static method of the Response interface returns a Response resulting in a redirect to the specified URL.
   * @param url The URL that the new response is to originate from.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect_static
   */
  redirect(url: string | URL): TypedResponse<any, Record<string, string>, 302>;
};

// Wrapped StatusCodeMap<any> in Partial<>, to fix packages/fets/src/client/auth/oauth.ts:76 error
export type TypedResponseWithJSONStatusMap<
  TResponseJSONStatusMap extends Partial<StatusCodeMap<any>>,
> = {
  [TStatusCode in keyof TResponseJSONStatusMap]: TStatusCode extends StatusCode
    ? TypedResponse<TResponseJSONStatusMap[TStatusCode], Record<string, string>, TStatusCode>
    : never;
}[keyof TResponseJSONStatusMap];

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  | 'TRACE';

export type TypedRequestInit<
  THeaders extends Record<string, string>,
  TMethod extends HTTPMethod,
  TFormData extends Record<string, FormDataEntryValue>,
> = Omit<RequestInit, 'method' | 'headers' | 'body'> & {
  method: TMethod;
  headers: TypedHeaders<THeaders>;
  body?: Exclude<BodyInit, FormData> | TFormData | undefined;
};

export type TypedRequest<
  TJSON = any,
  TFormData extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>,
  THeaders extends Record<string, string> = Record<string, string>,
  TMethod extends HTTPMethod = HTTPMethod,
  TQueryParams extends Record<string, string | string[]> = Record<string, string | string[]>,
  TPathParams extends Record<string, any> = Record<string, any>,
> = Omit<Request, 'json' | 'method' | 'headers' | 'formData'> &
  TypedBody<TJSON, TFormData, THeaders> & {
    method: TMethod;
    parsedUrl: TypedURL<TQueryParams>;
    params: TPathParams;
    query: TQueryParams;
  };

export type TypedRequestCtor = new <
  THeaders extends Record<string, string>,
  TMethod extends HTTPMethod,
  TQueryParams extends Record<string, string | string[]>,
  TFormData extends Record<string, FormDataEntryValue>,
>(
  input: string | TypedURL<TQueryParams>,
  init?: TypedRequestInit<THeaders, TMethod, TFormData> | undefined,
) => TypedRequest<any, TFormData, THeaders, TMethod, TQueryParams, any>;

export interface TypedURLSearchParams<TMap extends Record<string, string | string[]>> {
  append<TName extends keyof TMap>(
    name: TName,
    value: TMap[TName] extends any[] ? TMap[TName][1] : TMap[TName],
  ): void;
  delete(name: keyof TMap): void;
  get<TName extends keyof TMap>(
    name: TName,
  ): TMap[TName] extends any[] ? TMap[TName][1] : TMap[TName];
  getAll<TName extends keyof TMap>(
    name: TName,
  ): TMap[TName] extends any[] ? TMap[TName] : [TMap[TName]];
  set<TName extends keyof TMap>(
    name: TName,
    value: TMap[TName] extends any[] ? TMap[TName][1] : TMap[TName],
  ): void;
  sort(): void;
  toString(): string;
  forEach(
    callbackfn: <TName extends keyof TMap>(
      value: TMap[TName] extends any[] ? TMap[TName][1] : TMap[TName],
      name: TName,
      parent: TypedURLSearchParams<TMap>,
    ) => void,
    thisArg?: any,
  ): void;
}

export type TypedURLSearchParamsCtor = new <TMap extends Record<string, string | string[]>>(
  init?: TMap | undefined,
) => TypedURLSearchParams<TMap>;

export type TypedURL<TQueryParams extends Record<string, string | string[]>> = Omit<
  URL,
  'searchParams'
> & {
  searchParams: TypedURLSearchParams<TQueryParams>;
};

export type TypedURLCtor = new <TQueryParams extends Record<string, string | string[]>>(
  input: string,
  base?: string | TypedURL<any> | undefined,
) => TypedURL<TQueryParams>;

export interface TypedFormData<
  TMap extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>,
> {
  append<TName extends keyof TMap>(
    name: TName,
    value: TMap[TName] extends any[] ? TMap[TName][0] : TMap[TName],
    fileName?: string | undefined,
  ): void;
  delete(name: keyof TMap): void;
  get<TName extends keyof TMap>(
    name: TName,
  ): TMap[TName] extends any[] ? TMap[TName][0] : TMap[TName];
  getAll<TName extends keyof TMap>(
    name: TName,
  ): TMap[TName] extends any[] ? TMap[TName] : TMap[TName][];
  has<TName extends string>(
    name: TName,
  ): TName extends keyof TMap ? (TMap[TName] extends Maybe ? boolean : true) : false;
  set<TName extends keyof TMap>(
    name: TName,
    value: TMap[TName] extends any[] ? TMap[TName][0] : TMap[TName],
    fileName?: string | undefined,
  ): void;
  forEach(
    callbackfn: <TName extends keyof TMap>(value: TMap[TName], key: TName, parent: this) => void,
    thisArg?: any,
  ): void;
  entries(): IterableIterator<[keyof TMap, TMap[keyof TMap]]>;
  keys(): IterableIterator<keyof TMap>;
  values(): IterableIterator<TMap[keyof TMap]>;
  [Symbol.iterator](): IterableIterator<[keyof TMap, TMap[keyof TMap]]>;
}
