export type TypedBody<
  TJSON,
  TFormData extends Record<string, FormDataEntryValue>,
  THeaders extends Record<string, string>,
> = Omit<Body, 'json' | 'formData' | 'headers'> & {
  json(): Promise<TJSON>;
  formData(): Promise<TypedFormData<TFormData>>;
  headers: TypedHeaders<THeaders>;
};

type DefaultHTTPHeaders =
  | 'accept'
  | 'accept-language'
  | 'content-language'
  | 'content-type'
  | 'content-length';

type Maybe = undefined | null;

export interface TypedHeaders<TMap extends Record<string, string>> {
  append<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
    value: TName extends keyof TMap ? TMap[TName] : string,
  ): void;
  delete<TName extends DefaultHTTPHeaders | keyof TMap>(name: TName): void;
  get<TName extends DefaultHTTPHeaders | keyof TMap>(
    name: TName,
  ): TName extends keyof TMap
    ? TMap[TName]
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
}

export type TypedHeadersCtor = new <TMap extends Record<string, string>>(
  init?: TMap,
) => TypedHeaders<TMap>;

export type TypedResponseInit<TStatusCode extends number = 200> = Omit<ResponseInit, 'status'> & {
  status: TStatusCode;
};

type StartsWithNumber<T extends number, K extends number> = `${T}` extends `${K}${number}`
  ? true
  : false;

export type TypedResponse<
  TJSON = any,
  THeaders extends Record<string, string> = Record<string, string>,
  TStatusCode extends number = 200,
> = Omit<Response, 'json' | 'status' | 'ok'> &
  TypedBody<TJSON, Record<string, FormDataEntryValue>, THeaders> & {
    status: TStatusCode;
  } & {
    ok: StartsWithNumber<TStatusCode, 1> extends true
      ? false
      : StartsWithNumber<TStatusCode, 2> extends true
      ? true
      : StartsWithNumber<TStatusCode, 3> extends true
      ? false
      : StartsWithNumber<TStatusCode, 4> extends true
      ? false
      : StartsWithNumber<TStatusCode, 5> extends true
      ? false
      : boolean;
  };

export type TypedResponseCtor = Omit<typeof Response, 'json'> & {
  new <TStatusCode extends number = 200>(
    body: BodyInit | null | undefined,
    init: TypedResponseInit<TStatusCode> & { status: TStatusCode } | undefined,
  ): TypedResponse<any, Record<string, string>, TStatusCode>;
  new (
    body: BodyInit | null | undefined,
    init: ResponseInit | undefined,
  ): TypedResponse<any, Record<string, string>, 200>;
  new (
    body: BodyInit | null | undefined,
  ): TypedResponse<any, Record<string, string>, 200>;

  json<TJSON, TStatusCode extends number>(
    value: TJSON,
    init: TypedResponseInit<TStatusCode>,
  ): TypedResponse<TJSON, Record<string, string>, TStatusCode>;
  json<TJSON>(
    value: TJSON,
  ): TypedResponse<TJSON, Record<string, string>, 200>;
};

export type TypedResponseWithJSONStatusMap<TResponseJSONStatusMap extends Record<number, any>> = {
  [TStatusCode in keyof TResponseJSONStatusMap]?: TStatusCode extends number
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
  body?: Exclude<BodyInit, FormData> | TFormData;
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
  init?: TypedRequestInit<THeaders, TMethod, TFormData>,
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
  init?: TMap,
) => TypedURLSearchParams<TMap>;

export type TypedURL<TQueryParams extends Record<string, string | string[]>> = Omit<
  URL,
  'searchParams'
> & {
  searchParams: TypedURLSearchParams<TQueryParams>;
};

export type TypedURLCtor = new <TQueryParams extends Record<string, string | string[]>>(
  input: string,
  base?: string | TypedURL<any>,
) => TypedURL<TQueryParams>;

export interface TypedFormData<
  TMap extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>,
> {
  append<TName extends keyof TMap>(
    name: TName,
    value: TMap[TName] extends any[] ? TMap[TName][0] : TMap[TName],
    fileName?: string,
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
  forEach(
    callbackfn: <TName extends keyof TMap>(value: TMap[TName], key: TName, parent: this) => void,
    thisArg?: any,
  ): void;
}
