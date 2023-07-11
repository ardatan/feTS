import { B, Call, Pipe, Strings, Tuples } from 'hotscript';
import { O } from 'ts-toolbelt';
import {
  HTTPMethod,
  NotOkStatusCode,
  StatusCode,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from '../typed-fetch.js';
import { FromSchema, JSONSchema, OpenAPIDocument } from '../types.js';

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Mutable<Type[Key]>;
};

type RefToPath<T extends string> = T extends `#/${infer Ref}`
  ? Call<Strings.Split<'/'>, Ref>
  : never;

type ResolveRef<TObj, TRef extends string> = O.Path<TObj, RefToPath<TRef>>;

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
        : TParameter extends { type: string }
        ? FromSchema<{
            type: TParameter['type'];
          }>
        : unknown;
    }
  : {
      [TName in TParameter['name']]?: TParameter extends {
        schema: JSONSchema;
      }
        ? FromSchema<TParameter['schema']>
        : TParameter extends { type: string }
        ? FromSchema<{
            type: TParameter['type'];
          }>
        : unknown;
    };

export type OASParamMap<TParameters extends { name: string; in: string }[]> = UnionToIntersection<
  {
    [TIndex in keyof TParameters]: TParameters[TIndex] extends { in: infer TParamType }
      ? TParameters[TIndex] extends { required: true }
        ? {
            [TKey in TParamType extends keyof OASParamPropMap
              ? OASParamPropMap[TParamType]
              : never]: OASParamObj<TParameters[TIndex]>;
          }
        : {
            [TKey in TParamType extends keyof OASParamPropMap
              ? OASParamPropMap[TParamType]
              : never]?: OASParamObj<TParameters[TIndex]>;
          }
      : never;
  }[number]
>;

export type OASClient<TOAS extends OpenAPIDocument> = {
  [TPath in keyof OASPathMap<TOAS>]: {
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
          requestParams: OASRequestParams<TOAS, TPath, TMethod>,
          init?: RequestInit,
        ) => Promise<OASResponse<TOAS, TPath, TMethod>>
      : (
          requestParams?: OASRequestParams<TOAS, TPath, TMethod>,
          init?: RequestInit,
        ) => Promise<OASResponse<TOAS, TPath, TMethod>>;
  };
} & OASOAuthPath<TOAS>;

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
export type FixJSONSchema<T> = FixMissingAdditionalProperties<
  FixMissingTypeObject<FixExtraRequiredFields<T>>
>;

type FixMissingTypeObject<T> = T extends { properties: any[] } ? T & { type: 'object' } : T;

type FixMissingAdditionalProperties<T> = T extends { type: 'object'; properties: any[] }
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
                  : never]: infer TSecurityScheme;
              };
            };
          }
          ? OASSecurityParams<TSecurityScheme>
          : {}
        : {}) &
      // Respect global security definitions
      (TOAS extends { security: { [TSchemeNameKey in infer TSecuritySchemeName]: any }[] }
        ? TOAS extends {
            components: {
              securitySchemes: {
                [TSecuritySchemeNameKey in TSecuritySchemeName extends string
                  ? TSecuritySchemeName
                  : never]: infer TSecurityScheme;
              };
            };
          }
          ? OASSecurityParams<TSecurityScheme>
          : {}
        : {}) &
      // Respect old swagger security definitions
      (TOAS extends { security: { [TSchemeNameKey in infer TSecuritySchemeName]: any }[] }
        ? TOAS extends {
            securityDefinitions: {
              [TSecuritySchemeNameKey in TSecuritySchemeName extends string
                ? TSecuritySchemeName
                : never]: infer TSecurityScheme;
            };
          }
          ? OASSecurityParams<TSecurityScheme>
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
  formUrlEncoded?: Record<string, string>;
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

export type BasicAuthParams<TSecurityScheme> = TSecurityScheme extends
  | {
      type: 'http';
      scheme: 'basic';
    }
  | { type: 'basic' }
  ? {
      headers: {
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
      headers: {
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
        [TQueryName in TApiKeyQueryName extends string ? TApiKeyQueryName : never]: string;
      };
    }
  : {};

export type OAuth2AuthParams<TSecurityScheme> = TSecurityScheme extends {
  type: 'oauth2';
}
  ? {
      headers: {
        Authorization: `Bearer ${string}`;
      };
    }
  : {};

export type OASSecurityParams<TSecurityScheme> = BasicAuthParams<TSecurityScheme> &
  BearerAuthParams<TSecurityScheme> &
  ApiKeyAuthParams<TSecurityScheme> &
  OAuth2AuthParams<TSecurityScheme>;

export type OASOAuthPathRequestParamsWithHeader = {
  formUrlEncoded: {
    grant_type: 'client_credentials';
  };
  headers: {
    /**
     * The client ID and secret can be sent in the HTTP Basic auth header.
     * @example `Authorization: Basic <base64 encoded client_id:client_secret>`
     */
    Authorization: `Basic ${string}`;
  };
};

export type OASOAuthPathRequestParamsWithoutHeader = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
};

export type OASOAuthPath<TOAS> = TOAS extends {
  components: {
    securitySchemes: {
      [key: string]: {
        type: 'oauth2';
        flows: { authorizationCode: { tokenUrl: infer TTokenURL } };
      };
    };
  };
}
  ? {
      [TPath in TTokenURL extends string ? TTokenURL : never]: {
        /**
         * The client needs to authenticate themselves for this request.
         * Typically the service will allow either additional request parameters `client_id` and `client_secret`,
         * or accept the client ID and secret in the HTTP Basic auth header.
         */
        post(
          requestParams: OASOAuthPathRequestParamsWithHeader | OASOAuthPathRequestParamsWithoutHeader,
          requestInit?: RequestInit,
        ): Promise<
          TypedResponseWithJSONStatusMap<{
            200: OAuthSuccessResponse;
            400: OAuthFailedResponse;
          }>
        >;
      };
    }
  : {};

export type OAuthPathSuccessResponse = {
  /**
   * The access token string as issued by the authorization server.
   */
  access_token: string;
  /**
   * The type of token this is, typically just the string “Bearer”.
   */
  token_type: 'Bearer' | 'bearer';
  /**
   * If the access token expires, the server should reply with the duration of time the access token is granted for.
   */
  expires_in?: number;
  /**
   * If the access token will expire,
   * then it is useful to return a refresh token which applications can use to obtain another access token.
   * However, tokens issued with the implicit grant cannot be issued a refresh token.
   */
  refresh_token?: string;
  /**
   * If the scope the user granted is identical to the scope the app requested, this parameter is optional.
   * If the granted scope is different from the requested scope,
   * such as if the user modified the scope, then this parameter is required.
   */
  scope?: string;
};

export interface OAuthPathFailedResponse {
  error: OAuthErrorType;
  error_description?: string;
  error_uri?: string;
}

export enum OAuthPathErrorType {
  /**
   * The request is missing a parameter so the server can’t proceed with the request.
   * This may also be returned if the request includes an unsupported parameter or repeats a parameter.
   */
  invalid_request = 'invalid_request',
  /**
   * Client authentication failed, such as if the request contains an invalid client ID or secret.
   * Send an HTTP 401 response in this case.
   */
  invalid_client = 'invalid_client',
  /**
   * The authorization code (or user’s password for the password grant type) is invalid or expired.
   * This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request.
   */
  invalid_grant = 'invalid_grant',
  /**
   * For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request.
   */
  invalid_scope = 'invalid_scope',
  /**
   * This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps.
   */
  unauthorized_client = 'unauthorized_client',
  /**
   * If a grant type is requested that the authorization server doesn’t recognize, use this code.
   * Note that unknown grant types also use this specific error code rather than using the `invalid_request` above.
   */
  unsupported_grant_type = 'unsupported_grant_type',
}
