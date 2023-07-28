import type { B, Call, Fn, Objects, Pipe, Strings, Tuples } from 'hotscript';
import { type O } from 'ts-toolbelt';
import {
  HTTPMethod,
  NotOkStatusCode,
  OkStatusCode,
  StatusCode,
  TypedResponse,
} from '../typed-fetch.js';
import type {
  ExtractPathParamsWithBrackets,
  ExtractPathParamsWithPattern,
  FromSchema,
  JSONSchema,
  OpenAPIDocument,
  Simplify,
} from '../types.js';
import type { OASOAuthPath, OAuth2AuthParams } from './auth/oauth.js';

type JSONSchema7TypeName =
  | 'string' //
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';

type Mutable<Type> = FixJSONSchema<{
  -readonly [Key in keyof Type]: Mutable<Type[Key]>;
}>;

type RefToPath<T extends string> = T extends `#/${infer Ref}`
  ? Call<Strings.Split<'/'>, Ref>
  : never;

type ResolveRef<TObj, TRef extends string> = {
  $id: TRef;
} & O.Path<TObj, RefToPath<TRef>>;

type ResolveRefInObj<T, TBase> = T extends { $ref: infer Ref }
  ? Ref extends string
    ? ResolveRef<TBase, Ref>
    : T
  : T;

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
      ? OASStatusMap<TOAS, TPath, TMethod> extends Record<'200' | 200, any>
        ? NotOkStatusCode
        : OkStatusCode
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

export type OASParamObj<
  TParameter extends {
    name: string;
  },
> = TParameter extends { required: true }
  ? {
      [TName in TParameter['name']]: TParameter extends {
        schema: JSONSchema;
      }
        ? FromSchema<TParameter['schema']>
        : TParameter extends { type: JSONSchema7TypeName; enum?: any[] }
        ? FromSchema<{
            type: TParameter['type'];
            enum: TParameter['enum'];
          }>
        : unknown;
    }
  : {
      [TName in TParameter['name']]?: TParameter extends {
        schema: JSONSchema;
      }
        ? FromSchema<TParameter['schema']>
        : TParameter extends { type: JSONSchema7TypeName; enum?: any[] }
        ? FromSchema<{
            type: TParameter['type'];
            enum: TParameter['enum'];
          }>
        : unknown;
    };

interface OASParamToRequestParam<TParameters extends { in: string; required?: boolean }[]>
  extends Fn {
  return: this['arg0'] extends { name: string; in: infer TParamType }
    ? // If there is any required parameter for this parameter type, make that parameter type required
      TParameters extends [{ in: TParamType; required?: true }]
      ? {
          [TKey in TParamType extends keyof OASParamPropMap
            ? OASParamPropMap[TParamType]
            : never]: OASParamObj<this['arg0']>;
        }
      : {
          [TKey in TParamType extends keyof OASParamPropMap
            ? OASParamPropMap[TParamType]
            : never]?: OASParamObj<this['arg0']>;
        }
    : {};
}

export type OASParamMap<TParameters extends { name: string; in: string }[]> = Pipe<
  TParameters,
  [Tuples.Map<OASParamToRequestParam<TParameters>>, Tuples.ToIntersection]
>;

export type OASClient<TOAS extends OpenAPIDocument> = {
  /**
   * The path to be used for the request
   */
  [TPath in keyof OASPathMap<TOAS>]: {
    /**
     * HTTP Method to be used for this request
     */
    [TMethod in keyof OASMethodMap<TOAS, TPath>]: OASRequestParams<TOAS, TPath, TMethod> extends
      | {
          json: {};
        }
      | {
          params: {};
        }
      | {
          headers: {};
        }
      | {
          query: {};
        }
      ? (
          requestParams: Simplify<OASRequestParams<TOAS, TPath, TMethod>>,
          init?: RequestInit,
        ) => Promise<OASResponse<TOAS, TPath, TMethod>>
      : (
          requestParams?: Simplify<OASRequestParams<TOAS, TPath, TMethod>>,
          init?: RequestInit,
        ) => Promise<OASResponse<TOAS, TPath, TMethod>>;
  };
} & OASOAuthPath<TOAS>;

export type OASModel<
  TOAS extends OpenAPIDocument,
  TName extends TOAS extends {
    components: {
      schemas: Record<string, JSONSchema>;
    };
  }
    ? keyof TOAS['components']['schemas']
    : TOAS extends {
        definitions: Record<string, JSONSchema>;
      }
    ? keyof TOAS['definitions']
    : never,
> = TOAS extends {
  components: {
    schemas: {
      [TModelName in TName]: JSONSchema;
    };
  };
}
  ? FromSchema<TOAS['components']['schemas'][TName]>
  : TOAS extends {
      definitions: {
        [TModelName in TName]: JSONSchema;
      };
    }
  ? FromSchema<TOAS['definitions'][TName]>
  : never;

// Later suggest using json-machete
export type FixJSONSchema<T> = FixAdditionalPropertiesForAllOf<
  FixMissingAdditionalProperties<FixMissingTypeObject<FixExtraRequiredFields<T>>>
>;

type FixAdditionalPropertiesForAllOf<T> = T extends { allOf: any[] }
  ? Omit<T, 'allOf'> & {
      allOf: Call<Tuples.Map<Objects.Omit<'additionalProperties'>>, T['allOf']>;
    }
  : T;

type FixMissingTypeObject<T> = T extends { properties: any } ? T & { type: 'object' } : T;

type FixMissingAdditionalProperties<T> = T extends { type: 'object'; properties: any }
  ? T & { additionalProperties: false }
  : T;

type FixExtraRequiredFields<T> = T extends { properties: Record<string, any>; required: string[] }
  ? Omit<T, 'required'> & {
      required: Call<Tuples.Filter<B.Extends<keyof T['properties']>>, T['required']>;
    }
  : T;

export type OASRequestParams<
  TOAS extends OpenAPIDocument,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
> = (OASMethodMap<TOAS, TPath>[TMethod] extends {
  requestBody: { content: { 'application/json': { schema: JSONSchema } } };
}
  ? OASMethodMap<TOAS, TPath>[TMethod]['requestBody'] extends { required: true }
    ? {
        /**
         * The request body in JSON is required for this request.
         *
         * The value of `json` will be stringified and sent as the request body with `Content-Type: application/json`.
         */
        json: FromSchema<
          OASMethodMap<TOAS, TPath>[TMethod]['requestBody']['content']['application/json']['schema']
        >;
      }
    : {
        /**
         * The request body in JSON is optional for this request.
         *
         * The value of `json` will be stringified and sent as the request body with `Content-Type: application/json`.
         */
        json?: FromSchema<
          OASMethodMap<TOAS, TPath>[TMethod]['requestBody']['content']['application/json']['schema']
        >;
      }
  : OASMethodMap<TOAS, TPath>[TMethod] extends {
      requestBody: { content: { 'multipart/form-data': { schema: JSONSchema } } };
    }
  ? OASMethodMap<TOAS, TPath>[TMethod]['requestBody'] extends { required: true }
    ? {
        /**
         * The request body in multipart/form-data is required for this request.
         *
         * The value of `formData` will be sent as the request body with `Content-Type: multipart/form-data`.
         */
        formData: FromSchema<
          OASMethodMap<
            TOAS,
            TPath
          >[TMethod]['requestBody']['content']['multipart/form-data']['schema']
        >;
      }
    : {
        /**
         * The request body in multipart/form-data is optional for this request.
         *
         * The value of `formData` will be sent as the request body with `Content-Type: multipart/form-data`.
         */
        formData?: FromSchema<
          OASMethodMap<
            TOAS,
            TPath
          >[TMethod]['requestBody']['content']['multipart/form-data']['schema']
        >;
      }
  : OASMethodMap<TOAS, TPath>[TMethod] extends {
      requestBody: { content: { 'application/x-www-form-urlencoded': { schema: JSONSchema } } };
    }
  ? OASMethodMap<TOAS, TPath>[TMethod]['requestBody'] extends { required: true }
    ? {
        /**
         * The request body in application/x-www-form-urlencoded is required for this request.
         *
         * The value of `formUrlEncoded` will be sent as the request body with `Content-Type: application/x-www-form-urlencoded`.
         */
        formUrlEncoded: FromSchema<
          OASMethodMap<
            TOAS,
            TPath
          >[TMethod]['requestBody']['content']['application/x-www-form-urlencoded']['schema']
        >;
      }
    : {
        /**
         * The request body in application/x-www-form-urlencoded is optional for this request.
         *
         * The value of `formUrlEncoded` will be sent as the request body with `Content-Type: application/x-www-form-urlencoded`.
         */
        formUrlEncoded?: FromSchema<
          OASMethodMap<
            TOAS,
            TPath
          >[TMethod]['requestBody']['content']['application/x-www-form-urlencoded']['schema']
        >;
      }
  : {}) &
  (OASMethodMap<TOAS, TPath>[TMethod] extends { parameters: { name: string; in: string }[] }
    ? OASParamMap<OASMethodMap<TOAS, TPath>[TMethod]['parameters']>
    : {}) &
  // If there is any parameters defined in path but not in the parameters array, we should add them to the params
  (TPath extends `${string}{${string}}${string}`
    ? {
        /**
         * Parameters defined in the path are required for this request.
         *
         * The value of `params` will be used to replace the path parameters.
         *
         * For example if path is `/todos/{id}` and `params` is `{ id: '1' }`, the path will be `/todos/1`
         */
        params: Record<ExtractPathParamsWithBrackets<TPath>, string | number>;
      }
    : {}) &
  (TPath extends `${string}:${string}${string}`
    ? {
        /**
         * Parameters defined in the path are required for this request.
         *
         * The value of `params` will be used to replace the path parameters.
         *
         * For example if path is `/todos/:id` and `params` is `{ id: '1' }`, the path will be `/todos/1`.
         */
        params: Record<ExtractPathParamsWithPattern<TPath>, string | number>;
      }
    : {}) &
  // Respect security definitions in path object
  OASSecurityParamsBySecurityRef<TOAS, OASMethodMap<TOAS, TPath>[TMethod]> &
  // Respect global security definitions
  OASSecurityParamsBySecurityRef<TOAS, TOAS>;

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
  /**
   * The base URL of the API
   */
  endpoint?: string;
  /**
   * WHATWG compatible fetch implementation
   *
   * @see https://the-guild.dev/openapi/fets/client/client-configuration#customizing-the-fetch-function
   */
  fetchFn?: typeof fetch;
  /**
   * Plugins to extend the client functionality
   *
   * @see https://the-guild.dev/openapi/fets/client/plugins
   */
  plugins?: ClientPlugin[];
}

export type ClientOptionsWithStrictEndpoint<TOAS extends OpenAPIDocument> = Omit<
  ClientOptions,
  'endpoint'
> &
  (TOAS extends {
    servers: { url: infer TEndpoint extends string }[];
  }
    ? {
        /**
         * The base URL of the API defined in the OAS document.
         *
         * @see https://swagger.io/docs/specification/api-host-and-base-path/
         */
        endpoint: TEndpoint;
      }
    : TOAS extends {
        host: infer THost extends string;
        basePath: infer TBasePath extends string;
        schemes: (infer TProtocol extends string)[];
      }
    ? {
        /**
         * REST APIs have a base URL to which the endpoint paths are appended. The base URL is defined by `schemes`, `host` and `basePath` on the root level of the API specification.
         *
         * @see https://swagger.io/docs/specification/2-0/api-host-and-base-path/
         */
        endpoint: `${TProtocol}://${THost}${TBasePath}`;
      }
    : {
        endpoint?: string;
      });

export interface ClientRequestParams {
  json?: any;
  formData?: FormData;
  formUrlEncoded?: Record<string, string | string[]>;
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

export type BasicAuthParams<TSecurityScheme> = TSecurityScheme extends
  | {
      type: 'http';
      scheme: 'basic';
    }
  | { type: 'basic' }
  ? {
      headers: {
        /**
         * `Authorization` header is required for basic authentication
         * @see https://en.wikipedia.org/wiki/Basic_access_authentication
         *
         * It contains the word `Basic` followed by a space and a base64-encoded string `username:password`
         *
         * @example
         * ```
         * Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
         * ```
         */
        Authorization: `Basic ${string}`;
      };
    }
  : {};

export type BearerAuthParams<TSecurityScheme> = TSecurityScheme extends
  | {
      type: 'http';
      scheme: 'bearer';
    }
  | { type: 'bearer' }
  ? {
      /**
       * `Authorization` header is required for bearer authentication
       * @see https://swagger.io/docs/specification/authentication/bearer-authentication/
       */
      headers: {
        /**
         * It contains the word `Bearer` followed by a space and the token
         *
         * @example
         * ```
         * Authorization: Bearer {token}
         * ```
         */
        Authorization: `Bearer ${string}`;
      };
    }
  : {};

export type ApiKeyAuthParams<TSecurityScheme> = TSecurityScheme extends {
  type: 'apiKey';
  in: 'header';
  name: infer TApiKeyHeaderName;
}
  ? {
      headers: {
        /**
         * Header required for API key authentication
         */
        [THeaderName in TApiKeyHeaderName extends string ? TApiKeyHeaderName : never]: string;
      };
    }
  : TSecurityScheme extends {
      type: 'apiKey';
      in: 'query';
      name: infer TApiKeyQueryName;
    }
  ? {
      query: {
        /**
         * Query parameter required for API key authentication
         */
        [TQueryName in TApiKeyQueryName extends string ? TApiKeyQueryName : never]: string;
      };
    }
  : {};

export type SecuritySchemeName<T extends { security: { [key: string]: any }[] }> = Call<
  Tuples.Map<Objects.Keys>,
  T['security']
>[number];

export type OASSecurityParams<TSecurityScheme> = BasicAuthParams<TSecurityScheme> &
  BearerAuthParams<TSecurityScheme> &
  ApiKeyAuthParams<TSecurityScheme> &
  OAuth2AuthParams<TSecurityScheme>;

export type OASSecurityParamsBySecurityRef<TOAS, TSecurityObj> = TSecurityObj extends {
  security: { [key: string]: any }[];
}
  ? TOAS extends
      | {
          components: {
            securitySchemes: {
              [TSecuritySchemeNameKey in SecuritySchemeName<TSecurityObj> extends string
                ? SecuritySchemeName<TSecurityObj>
                : never]: infer TSecurityScheme;
            };
          };
        }
      | {
          securityDefinitions: {
            [TSecuritySchemeNameKey in SecuritySchemeName<TSecurityObj> extends string
              ? SecuritySchemeName<TSecurityObj>
              : never]: infer TSecurityScheme;
          };
        }
    ? OASSecurityParams<TSecurityScheme>
    : // OAS may have a bad reference to a security scheme
    // So we can assume it
    SecuritySchemeName<TSecurityObj> extends `basic${string}`
    ? BasicAuthParams<{
        type: 'http';
        scheme: 'basic';
      }>
    : SecuritySchemeName<TSecurityObj> extends `bearer${string}`
    ? BearerAuthParams<{
        type: 'http';
        scheme: 'bearer';
      }>
    : SecuritySchemeName<TSecurityObj> extends `oauth${string}`
    ? OAuth2AuthParams<{
        type: 'oauth2';
      }>
    : {}
  : {};
