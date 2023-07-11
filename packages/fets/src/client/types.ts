import { Call, Objects, Pipe, Strings, Tuples } from 'hotscript';
import { HTTPMethod, NotOkStatusCode, StatusCode, TypedResponse } from '../typed-fetch.js';
import { FromSchema, JSONSchema, OpenAPIDocument } from '../types.js';

/**
 * @deprecated Use `NormalizeOAS` to normalize OpenAPI schema typings for the client generic
 */
export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Mutable<Type[Key]>;
};

type RefToPath<T extends string> = T extends `#/${infer Ref}`
  ? Pipe<Ref, [Strings.Split<'/'>, Tuples.Join<'.'>]>
  : never;

type ResolveRef<TObj, TRef extends string> = Call<Objects.Get<RefToPath<TRef>>, TObj>;

type ResolveRefInObj<T, TBase> = FixJSONSchema<
  T extends { $ref: infer Ref } ? (Ref extends string ? ResolveRef<TBase, Ref> : T) : T
>;

type ResolveRefsInObj<T, TBase = T> = {
  [K in keyof T]: ResolveRefsInObj<ResolveRefInObj<T[K], TBase>, TBase>;
};

/**
 * Resolve all $refs in the OpenAPI document and normalizes the types for the client generic
 */
export type NormalizeOAS<TOAS> = Mutable<ResolveRefsInObj<TOAS>>;

export type OASPathMap<TOAS extends OpenAPIDocument> = TOAS['paths'];
export type OASMethodMap<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
> = OASPathMap<TOAS>[TPath];
export type OASStatusMap<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
> = OASMethodMap<TOAS, TPath>[TMethod] extends { responses: any }
  ? OASMethodMap<TOAS, TPath>[TMethod]['responses']
  : never;

export type OASResponseSchemas<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TStatus extends keyof OASStatusMap<TOAS, TPath, TMethod>,
> = OASStatusMap<TOAS, TPath, TMethod>[TStatus]['content'];

export type OASJSONResponseSchema<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TStatus extends keyof OASStatusMap<TOAS, TPath, TMethod>,
> = OASStatusMap<TOAS, TPath, TMethod>[TStatus] extends { content: any }
  ? OASResponseSchemas<TOAS, TPath, TMethod, TStatus>[keyof OASResponseSchemas<
      TOAS,
      TPath,
      TMethod,
      TStatus
    >]['schema']
  : OASStatusMap<TOAS, TPath, TMethod>[TStatus]['schema'];

type ToNumber<T extends string, R extends any[] = []> = T extends `${R['length']}`
  ? R['length']
  : ToNumber<T, [1, ...R]>;

export type OASResponse<
  TOAS extends OpenAPIDocument,
  TPath extends keyof TOAS['paths'],
  TMethod extends keyof TOAS['paths'][TPath],
> = {
  [TStatus in keyof OASStatusMap<TOAS, TPath, TMethod>]: TypedResponse<
    FromSchema<OASJSONResponseSchema<TOAS, TPath, TMethod, TStatus>>,
    Record<string, string>,
    TStatus extends StatusCode
      ? TStatus
      : TStatus extends 'default'
      ? NotOkStatusCode
      : TStatus extends `${number}${number}${number}`
      ? ToNumber<TStatus> extends StatusCode
        ? ToNumber<TStatus>
        : 200
      : 200
  >;
}[keyof OASStatusMap<TOAS, TPath, TMethod>];

interface OASParamPropMap {
  query: 'query';
  path: 'params';
  header: 'headers';
}

type UnionToIntersectionHelper<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type UnionToIntersection<U> = boolean extends U
  ? UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
  : UnionToIntersectionHelper<U>;

export type OASParamMap<TParameters extends { name: string; in: string }[]> = UnionToIntersection<
  {
    [TIndex in keyof TParameters]: TParameters[TIndex] extends { in: infer TParamType }
      ? {
          [TKey in TParamType extends keyof OASParamPropMap
            ? OASParamPropMap[TParamType]
            : never]: TParameters[TIndex] extends { required: true }
            ? {
                [TName in TParameters[TIndex]['name']]: TParameters[TIndex] extends {
                  schema: JSONSchema;
                }
                  ? FromSchema<TParameters[TIndex]['schema']>
                  : TParameters[TIndex] extends { type: string }
                  ? FromSchema<{
                      type: TParameters[TIndex]['type'];
                    }>
                  : unknown;
              }
            : {
                [TName in TParameters[TIndex]['name']]?: TParameters[TIndex] extends {
                  schema: JSONSchema;
                }
                  ? FromSchema<TParameters[TIndex]['schema']>
                  : TParameters[TIndex] extends { type: string }
                  ? FromSchema<{
                      type: TParameters[TIndex]['type'];
                    }>
                  : unknown;
              };
        }
      : never;
  }[number]
>;

export type OASClient<TOAS extends OpenAPIDocument> = {
  [TPath in keyof OASPathMap<TOAS>]: {
    [TMethod in keyof OASMethodMap<TOAS, TPath>]: (
      requestParams?: OASRequestParams<TOAS, TPath, TMethod>,
      init?: RequestInit,
    ) => Promise<OASResponse<TOAS, TPath, TMethod>>;
  };
};

export type OASModel<TOAS extends OpenAPIDocument, TName extends string> = TOAS extends {
  components: {
    schemas: {
      [TModelName in TName]: JSONSchema;
    };
  };
}
  ? FromSchema<TOAS['components']['schemas'][TName]>
  : never;

// Later suggest using json-machete
type FixJSONSchema<T> = T extends { properties: any }
  ? T extends { type: 'object' }
    ? T & { additionalProperties: false }
    : {
        type: 'object';
        additionalProperties: false;
      } & T
  : T;

export type OASRequestParams<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
> = OASMethodMap<TOAS, TPath>[TMethod] extends {
  requestBody: { content: { 'application/json': { schema: JSONSchema } } };
}
  ? OASMethodMap<TOAS, TPath>[TMethod]['requestBody'] extends { required: true }
    ? {
        json: FromSchema<
          OASMethodMap<TOAS, TPath>[TMethod]['requestBody']['content']['application/json']['schema']
        >;
      }
    : {
        json?: FromSchema<
          OASMethodMap<TOAS, TPath>[TMethod]['requestBody']['content']['application/json']['schema']
        >;
      }
  : {} & (OASMethodMap<TOAS, TPath>[TMethod] extends { parameters: { name: string; in: string }[] }
      ? OASParamMap<OASMethodMap<TOAS, TPath>[TMethod]['parameters']>
      : {}) &
      // If there is any parameters defined in path but not in the parameters array, we should add them to the params
      (TPath extends `${string}{${string}}${string}`
        ? { params: Record<ExtractPathParamsWithBrackets<TPath>, string | number> }
        : {}) &
      (TPath extends `${string}:${string}${string}`
        ? { params: Record<ExtractPathParamsWithPattern<TPath>, string | number> }
        : {}) &
      // Respect security definitions in path object
      (OASMethodMap<TOAS, TPath>[TMethod] extends {
        security: { [TSchemeNameKey in infer TSecuritySchemeName]: any }[];
      }
        ? TOAS extends {
            components: {
              securitySchemes: {
                [TSecuritySchemeNameKey in TSecuritySchemeName extends string
                  ? TSecuritySchemeName
                  : never]: { type: infer TSecurityType };
              };
            };
          }
          ? OASSecurityParamsByType<TSecurityType>
          : {}
        : {}) &
      // Respect global security definitions
      (TOAS extends { security: { [TSchemeNameKey in infer TSecuritySchemeName]: any }[] }
        ? TOAS extends {
            components: {
              securitySchemes: {
                [TSecuritySchemeNameKey in TSecuritySchemeName extends string
                  ? TSecuritySchemeName
                  : never]: { type: infer TSecurityType };
              };
            };
          }
          ? OASSecurityParamsByType<TSecurityType>
          : {}
        : {}) &
      // Respect old swagger security definitions
      (TOAS extends { security: { [TSchemeNameKey in infer TSecuritySchemeName]: any }[] }
        ? TOAS extends {
            securityDefinitions: {
              [TSecuritySchemeNameKey in TSecuritySchemeName extends string
                ? TSecuritySchemeName
                : never]: { type: infer TSecurityType };
            };
          }
          ? OASSecurityParamsByType<TSecurityType>
          : {}
        : {}) &
      (OASMethodMap<TOAS, TPath>[TMethod] extends {
        requestBody: { content: { 'multipart/form-data': { schema: JSONSchema } } };
      }
        ? OASMethodMap<TOAS, TPath>[TMethod]['requestBody'] extends { required: true }
          ? {
              formData: FromSchema<
                OASMethodMap<
                  TOAS,
                  TPath
                >[TMethod]['requestBody']['content']['multipart/form-data']['schema']
              >;
            }
          : {
              formData?: FromSchema<
                OASMethodMap<
                  TOAS,
                  TPath
                >[TMethod]['requestBody']['content']['multipart/form-data']['schema']
              >;
            }
        : {});

export type OASInput<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TRequestType extends keyof OASRequestParams<TOAS, TPath, TMethod>,
> = OASRequestParams<TOAS, TPath, TMethod>[TRequestType];

export type OASOutput<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TStatusCode extends keyof OASStatusMap<TOAS, TPath, TMethod> = 200,
> = FromSchema<OASJSONResponseSchema<TOAS, TPath, TMethod, TStatusCode>>;

export type OASComponentSchema<TOAS extends OpenAPIDocument, TName extends string> = TOAS extends {
  components: {
    schemas: {
      [TModelName in TName]: JSONSchema;
    };
  };
}
  ? FromSchema<TOAS['components']['schemas'][TName]>
  : never;

export interface ClientOptions {
  endpoint?: string;
  fetchFn?: typeof fetch;
  plugins?: ClientPlugin[];
}

export interface ClientRequestParams {
  json?: any;
  formData?: FormData;
  params?: Record<string, string>;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}

export type ClientMethod = (requestParams?: ClientRequestParams) => Promise<Response>;

export interface ClientPlugin {
  onRequestInit?: OnRequestInitHook;
  onFetch?: OnFetchHook;
  onResponse?: OnResponseHook;
}

export type OnRequestInitHook = (payload: ClientOnRequestInitPayload) => Promise<void> | void;
export type OnFetchHook = (payload: ClientOnFetchHookPayload) => Promise<void> | void;
export type OnResponseHook = (payload: ClientOnResponseHookPayload) => Promise<void> | void;

export interface ClientOnRequestInitPayload {
  path: string;
  method: HTTPMethod;
  requestParams: ClientRequestParams;
  requestInit: RequestInit;
  endResponse(response: Response): void;
}

export interface ClientOnFetchHookPayload {
  url: string;
  init: RequestInit;
  fetchFn: typeof fetch;
  setFetchFn(fetchFn: typeof fetch): void;
}

export interface ClientOnResponseHookPayload {
  path: string;
  method: HTTPMethod;
  requestParams: ClientRequestParams;
  requestInit: RequestInit;
  response: Response;
}

export type ExtractPathParamsWithBrackets<TPath extends string> = Pipe<
  TPath,
  [
    Strings.Split<'/' | ';'>,
    Tuples.Filter<Strings.StartsWith<'{'>>,
    Tuples.Map<Strings.Trim<'{' | '}'>>,
    Tuples.ToUnion,
  ]
>;

export type ExtractPathParamsWithPattern<TPath extends string> = Pipe<
  TPath,
  [
    Strings.Split<'/'>,
    Tuples.Filter<Strings.StartsWith<':'>>,
    Tuples.Map<Strings.Trim<':'>>,
    Tuples.ToUnion,
  ]
>;

export interface OASSecurityParamsMap {
  oauth2: {
    headers: {
      Authorization: `Bearer ${string}`;
    };
  };
  basic: {
    headers: {
      Authorization: `Basic ${string}`;
    };
  };
}

export type OASSecurityParamsByType<TSecurityType> =
  TSecurityType extends keyof OASSecurityParamsMap ? OASSecurityParamsMap[TSecurityType] : {};
