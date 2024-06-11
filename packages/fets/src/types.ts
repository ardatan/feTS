import type { Pipe, Strings, Tuples } from 'hotscript';
import type {
  FromSchema as FromSchemaOriginal,
  JSONSchema as JSONSchemaOrBoolean,
} from 'json-schema-to-ts';
import type {
  ErrorHandler,
  FetchAPI,
  ServerAdapter,
  ServerAdapterOptions,
  ServerAdapterPlugin,
  ServerAdapterRequestHandler,
} from '@whatwg-node/server';
import { ClientTypedResponsePromise } from './client/clientResponse.js';
import { ClientRequestInit } from './client/types.js';
import type { SwaggerUIOpts } from './plugins/openapi.js';
import type {
  HTTPMethod,
  StatusCode,
  TypedRequest,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from './typed-fetch.js';

export { TypedRequest as RouterRequest };

export type Simplify<T> = { [KeyType in keyof T]: Simplify<T[KeyType]> } & {};

export type JSONSerializer = (obj: any) => string;

export type JSONSchema = Exclude<JSONSchemaOrBoolean, boolean>;

export interface OpenAPIInfo {
  title?: string;
  description?: string;
  version?: string;
  license?: {
    name?: string;
    url?: string;
  };
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
}

export type OpenAPIPathObject = Record<string, OpenAPIOperationObject> & {
  parameters?: OpenAPIParameterObject[];
};

export interface OpenAPIParameterObject {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required?: boolean;
  schema?: any;
}

export interface OpenAPIRequestBodyObject {
  content?: Record<string, OpenAPIMediaTypeObject>;
}

export interface OpenAPIOperationObject {
  operationId?: string;
  description?: string;
  tags?: string[];
  parameters?: OpenAPIParameterObject[];
  requestBody?: OpenAPIRequestBodyObject;
  responses?: Record<string | number, OpenAPIResponseObject>;
  security?: any[];
}

export interface OpenAPIResponseObject {
  description?: string;
  content?: Record<string, OpenAPIMediaTypeObject>;
}

export interface OpenAPIMediaTypeObject {
  schema?: any;
}

export type OpenAPIDocument = {
  openapi?: string;
  info?: OpenAPIInfo;
  servers?:
    | {
        url: string;
      }[]
    | string[];
  paths?: Record<string, OpenAPIPathObject>;
  components?: unknown;
};

export interface RouterOpenAPIOptions<TComponents extends RouterComponentsBase>
  extends OpenAPIDocument {
  endpoint?: string | false;
  components?: TComponents;
  includeValidationErrors?: boolean;
}

export interface RouterSwaggerUIOptions extends SwaggerUIOpts {
  endpoint?: string | false;
}

export interface RouterOptions<TServerContext, TComponents extends RouterComponentsBase>
  extends ServerAdapterOptions<TServerContext> {
  base?: string;
  plugins?: RouterPlugin<TServerContext, TComponents>[];

  openAPI?: RouterOpenAPIOptions<TComponents>;
  swaggerUI?: RouterSwaggerUIOptions;
  landingPage?: boolean;

  onError?: ErrorHandler<TServerContext>;
}

export type RouterComponentsBase = {
  schemas?: Record<string, JSONSchema>;
  securitySchemes?: Record<string, SecurityScheme>;
};

export type BasicAuthSecurityScheme = {
  type: 'http';
  scheme: 'basic';
};

export type BearerAuthSecurityScheme = {
  type: 'http';
  scheme: 'bearer';
};

export type ApiKeySecurityScheme = {
  type: 'apiKey';
  name: string;
  in: 'header' | 'query' | 'cookie';
};

export type SecurityScheme =
  | BasicAuthSecurityScheme
  | BearerAuthSecurityScheme
  | ApiKeySecurityScheme;

/*
Maybe later;

type IntRange<
  START extends number,
  END extends number,
  ARR extends unknown[] = [],
  ACC extends number = never
> = ARR['length'] extends END
  ? ACC | START | END
  : IntRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

type RangedJSONSchema<T extends { minimum: number; maximum: number }> = T extends {
  minimum: infer MIN;
  maximum: infer MAX;
} ? MIN extends number ? MAX extends number ? IntRange<MIN, MAX> : never : never : never;
*/

export type FromSchema<T> =
  /* T extends { type: 'integer'; minimum: number; maximum: number } ? RangedJSONSchema<T> : */ T extends {
    static: infer U;
  }
    ? U
    : T extends JSONSchema
      ? FromSchemaOriginal<
          T,
          {
            deserialize: T extends T['properties'][keyof T['properties']]
              ? false
              : [
                  {
                    pattern: {
                      type: 'string';
                      format: 'binary';
                    };
                    output: File;
                  },
                  {
                    pattern: {
                      type: 'number';
                      format: 'int64';
                    };
                    output: bigint | number;
                  },
                  {
                    pattern: {
                      type: 'integer';
                      format: 'int64';
                    };
                    output: bigint | number;
                  },
                ];
          }
        >
      : never;

export type FromRouterComponentSchema<TRouter extends Router<any, any, any>, TName extends string> =
  TRouter extends Router<any, infer TComponents, any>
    ? TComponents extends Required<RouterComponentsBase>
      ? FromSchema<TComponents['schemas'][TName]>
      : never
    : never;

export type PromiseOrValue<T> = T | Promise<T>;

export type StatusCodeMap<T> = {
  [TKey in StatusCode]?: T;
};

export interface RouterBaseObject<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse>,
> {
  openAPIDocument: OpenAPIDocument;
  handle: ServerAdapterRequestHandler<TServerContext>;
  route<
    const TRouteSchemas extends RouteSchemas,
    TMethod extends HTTPMethod,
    TPath extends string,
    TTypedRequest extends TypedRequestFromRouteSchemas<TComponents, TRouteSchemas, TMethod, TPath>,
    TTypedResponse extends TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>,
  >(
    opts: RouteWithSchemasOpts<
      TServerContext,
      TComponents,
      TRouteSchemas,
      TMethod,
      TPath,
      TTypedRequest,
      TTypedResponse
    >,
  ): Router<
    TServerContext,
    TComponents,
    TRouterSDK & RouterSDK<TPath, TTypedRequest, TTypedResponse>
  >;
  route<
    TMethod extends HTTPMethod,
    TPath extends string,
    TTypedRequest extends TypedRequest<
      any,
      Record<string, FormDataEntryValue | undefined>,
      Record<string, string | undefined>,
      TMethod,
      any,
      Record<ExtractPathParamsWithPattern<TPath>, string>
    >,
    TTypedResponse extends TypedResponse,
  >(
    opts: RouteWithTypesOpts<TServerContext, TMethod, TPath, TTypedRequest, TTypedResponse>,
  ): Router<
    TServerContext,
    TComponents,
    TRouterSDK & RouterSDK<TPath, TTypedRequest, TTypedResponse>
  >;
  __client: TRouterSDK;
  __onRouterInitHooks: OnRouterInitHook<TServerContext>[];
}

export type Router<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse>,
> = ServerAdapter<TServerContext, RouterBaseObject<TServerContext, TComponents, TRouterSDK>>;

export type OnRouteHook<TServerContext> = (payload: OnRouteHookPayload<TServerContext>) => void;

export type OnRouteHandleHook<TServerContext, TComponents extends RouterComponentsBase> = (
  payload: OnRouteHandleHookPayload<TServerContext, TComponents>,
) => void;

export interface OnRouteHandleHookPayload<
  TServerContext,
  TComponents extends RouterComponentsBase,
> {
  request: TypedRequest;
  route: RouteWithSchemasOpts<
    TServerContext,
    TComponents,
    RouteSchemas,
    HTTPMethod,
    string,
    TypedRequest,
    TypedResponse
  >;
}

export type RouteHandler<
  TServerContext = {},
  TTypedRequest extends TypedRequest = TypedRequest,
  TTypedResponse extends TypedResponse = TypedResponse,
> = (
  /**
   * The request object represents the incoming HTTP request.
   * This object implements [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface.
   */
  request: TTypedRequest,
  context: TServerContext,
) => PromiseOrValue<TTypedResponse>;
// TODO: Remove Response from here

export type OnRouteHookPayload<TServerContext> = {
  basePath: string;
  openAPIDocument: OpenAPIDocument;
  routeByPatternByMethod: Map<
    HTTPMethod,
    Map<
      URLPattern,
      RouteWithSchemasOpts<
        any,
        RouterComponentsBase,
        RouteSchemas,
        HTTPMethod,
        string,
        TypedRequest,
        TypedResponse
      >
    >
  >;
  routeByPathByMethod: Map<
    HTTPMethod,
    Map<
      string,
      RouteWithSchemasOpts<
        any,
        RouterComponentsBase,
        RouteSchemas,
        HTTPMethod,
        string,
        TypedRequest,
        TypedResponse
      >
    >
  >;
  route: RouteWithSchemasOpts<
    TServerContext,
    RouterComponentsBase,
    RouteSchemas,
    HTTPMethod,
    string,
    TypedRequest,
    TypedResponse
  >;
  fetchAPI: FetchAPI;
};

export type OnRouterInitHook<TServerContext> = (router: Router<TServerContext, any, any>) => void;

export type RouterPlugin<
  TServerContext,
  TComponents extends RouterComponentsBase,
> = ServerAdapterPlugin<TServerContext> & {
  onRouterInit?: OnRouterInitHook<TServerContext>;
  onRoute?: OnRouteHook<TServerContext>;
  onRouteHandle?: OnRouteHandleHook<TServerContext, TComponents>;
};

type ObjectSchemaWithPrimitiveProperties = JSONSchema & {
  type: 'object';
  properties: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean';
    }
  >;
};

type ObjectSchema = JSONSchema & {
  type: 'object';
};

export type RouteSchemas = {
  request?: {
    headers?: ObjectSchemaWithPrimitiveProperties;
    params?: ObjectSchemaWithPrimitiveProperties;
    query?: ObjectSchema;
    json?: JSONSchema;
    formData?: ObjectSchema;
  };
  responses?: StatusCodeMap<JSONSchema>;
};

export type RouterSDKOpts<
  TTypedRequest extends TypedRequest = TypedRequest,
  TMethod extends HTTPMethod = HTTPMethod,
> =
  TTypedRequest extends TypedRequest<
    infer TJSONBody,
    infer TFormData,
    infer THeaders,
    TMethod,
    infer TQueryParams,
    infer TPathParam
  >
    ? Simplify<
        (Partial<TJSONBody> extends TJSONBody ? { json?: TJSONBody } : { json: TJSONBody }) &
          (Partial<THeaders> extends THeaders ? { headers?: THeaders } : { headers: THeaders }) &
          (Partial<TQueryParams> extends TQueryParams
            ? { query?: TQueryParams }
            : { query: TQueryParams }) &
          (Partial<TPathParam> extends TPathParam
            ? { params?: TPathParam }
            : { params: TPathParam })
      > &
        (Partial<TFormData> extends TFormData ? { formData?: TFormData } : { formData: TFormData })
    : never;

export type RouterSDK<
  TPath extends string = string,
  TTypedRequest extends TypedRequest = TypedRequest,
  TTypedResponse extends TypedResponse = TypedResponse,
> = {
  [TPathKey in TPath]: {
    [TMethod in Lowercase<TTypedRequest['method']>]: Partial<
      RouterSDKOpts<TTypedRequest, TTypedRequest['method']>
    > extends RouterSDKOpts<TTypedRequest, TTypedRequest['method']>
      ? (
          opts?: RouterSDKOpts<TTypedRequest, TTypedRequest['method']> & ClientRequestInit,
        ) => ClientTypedResponsePromise<Exclude<TTypedResponse, undefined>>
      : (
          opts: RouterSDKOpts<TTypedRequest, TTypedRequest['method']> & ClientRequestInit,
        ) => ClientTypedResponsePromise<Exclude<TTypedResponse, undefined>>;
  };
};

export type FromSchemaWithComponents<
  TComponents,
  TSchema extends JSONSchema,
> = TComponents extends {
  schemas: Record<string, JSONSchema>;
}
  ? FromSchema<
      {
        components: TComponents;
      } & TSchema
    >
  : FromSchema<TSchema>;

export type TypedRequestFromRouteSchemas<
  TComponents extends RouterComponentsBase,
  TRouteSchemas extends RouteSchemas,
  TMethod extends HTTPMethod,
  TPath extends string,
> = TRouteSchemas extends { request: Required<RouteSchemas>['request'] }
  ? TypedRequest<
      TRouteSchemas['request'] extends { json: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['json']>
        : {},
      TRouteSchemas['request'] extends { formData: JSONSchema }
        ? FromSchemaWithComponents<
            TComponents,
            TRouteSchemas['request']['formData']
          > extends Record<string, FormDataEntryValue | undefined>
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['formData']>
          : never
        : {},
      TRouteSchemas['request'] extends { headers: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']>
          : never
        : {},
      TMethod,
      TRouteSchemas['request'] extends { query: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['query']>
        : {},
      TRouteSchemas['request'] extends { params: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']> extends Record<
            string,
            any
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']>
          : never
        : Record<ExtractPathParamsWithPattern<TPath>, string>
    >
  : TypedRequest<
      any,
      Partial<Record<string, FormDataEntryValue>>,
      Partial<Record<string, string>>,
      TMethod,
      any,
      Record<ExtractPathParamsWithPattern<TPath>, string>
    >;

export type TypedResponseFromRouteSchemas<
  TComponents extends RouterComponentsBase,
  TRouteSchemas extends RouteSchemas,
> = TRouteSchemas extends { responses: StatusCodeMap<JSONSchema> }
  ? TypedResponseWithJSONStatusMap<{
      [TStatusCode in keyof TRouteSchemas['responses']]: TRouteSchemas['responses'][TStatusCode] extends JSONSchema
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['responses'][TStatusCode]>
        : never;
    }>
  : TypedResponse;

export type RouteWithSchemasOpts<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouteSchemas extends RouteSchemas,
  TMethod extends HTTPMethod,
  TPath extends string,
  TTypedRequest extends TypedRequestFromRouteSchemas<TComponents, TRouteSchemas, TMethod, TPath>,
  TTypedResponse extends TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>,
> = {
  schemas: TRouteSchemas;
  security?: SecuritySchemeRefsFromComponents<TComponents>[];
} & RouteWithTypesOpts<TServerContext, TMethod, TPath, TTypedRequest, TTypedResponse>;

export type SecuritySchemeRefsFromComponents<TComponents extends RouterComponentsBase> =
  TComponents extends {
    securitySchemes: Record<string, SecurityScheme>;
  }
    ? Record<keyof TComponents['securitySchemes'], any>
    : never;

export type RouteWithTypesOpts<
  TServerContext,
  TMethod extends HTTPMethod,
  TPath extends string,
  TTypedRequest extends TypedRequest<
    any,
    Record<string, FormDataEntryValue | undefined>,
    Record<string, string | undefined>,
    TMethod,
    any,
    Record<ExtractPathParamsWithPattern<TPath>, string>
  >,
  TTypedResponse extends TypedResponse,
> = {
  operationId?: string;
  description?: string;
  method?: TMethod;
  tags?: string[];
  internal?: boolean;
  path: TPath;
  handler: RouteHandler<TServerContext, TTypedRequest, TTypedResponse>;
};

export type RouteInput<
  TRouter extends Router<any, any, {}>,
  TPath extends string,
  TMethod extends Lowercase<HTTPMethod> = 'post',
  TParamType extends keyof RouterSDKOpts = 'json',
> =
  TRouter extends Router<any, any, infer TRouterSDK>
    ? TRouterSDK[TPath][TMethod] extends (requestParams?: infer TRequestParams) => any
      ? TRequestParams extends {
          [TParamTypeKey in TParamType]?: infer TParamTypeValue;
        }
        ? TParamTypeValue
        : never
      : never
    : never;

export type RouteOutput<
  TRouter extends Router<any, any, {}>,
  TPath extends string,
  TMethod extends Lowercase<HTTPMethod> = 'post',
  TStatusCode extends StatusCode = 200,
> =
  TRouter extends Router<any, any, infer TRouterSDK>
    ? TRouterSDK extends RouterSDK
      ? TRouterSDK[TPath][TMethod] extends (...args: any[]) => Promise<infer TTypedResponse>
        ? TTypedResponse extends TypedResponse<infer TJSONBody, any, TStatusCode>
          ? TJSONBody
          : never
        : never
      : never
    : never;

export type RouterClient<TRouter extends Router<any, any, any>> = TRouter['__client'];

export type RouterInput<TRouter extends Router<any, any, any>> = {
  [TPath in keyof RouterClient<TRouter>]: {
    [TMethod in keyof RouterClient<TRouter>[TPath]]: RouterClient<TRouter>[TPath][TMethod] extends (
      requestParams?: infer TRequestParams,
    ) => any
      ? Required<TRequestParams>
      : never;
  };
};

export type RouterJsonPostInput<TRouter extends Router<any, any, any>> = {
  [TPath in keyof RouterClient<TRouter>]: {
    [TMethod in keyof RouterClient<TRouter>[TPath]]: RouterInput<TRouter>[TPath][TMethod] extends {
      json: infer TJSON;
    }
      ? TJSON
      : never;
  }['post'];
};

export type RouterJsonPostSuccessOutput<TRouter extends Router<any, any, any>> = {
  [TPath in keyof RouterClient<TRouter>]: {
    [TMethod in keyof RouterClient<TRouter>[TPath]]: RouterOutput<TRouter>[TPath][TMethod][200];
  }['post'];
};

export type RouterOutput<TRouter extends Router<any, any, any>> = {
  [TPath in keyof RouterClient<TRouter>]: {
    [TMethod in keyof RouterClient<TRouter>[TPath]]: RouterClient<TRouter>[TPath][TMethod] extends (
      requestParams?: any,
    ) => Promise<infer TTypedResponse>
      ? {
          [TStatusCode in StatusCode]: TTypedResponse extends TypedResponse<
            infer TJSONBody,
            any,
            TStatusCode
          >
            ? TJSONBody
            : never;
        }
      : never;
  };
};

export type RouterComponentSchema<TRouter extends Router<any, any, any>, TName extends string> =
  TRouter extends Router<any, infer TComponents, any>
    ? TComponents extends { schemas: Record<string, JSONSchema> }
      ? FromSchema<TComponents['schemas'][TName]>
      : never
    : never;

type SplitByDelimiter<T extends string, D extends string> = T extends `${infer P}${D}${infer Q}`
  ? [P, ...SplitByDelimiter<Q, D>]
  : [T];

type IsPathParameter<T extends string> = T extends `{${infer U}}` ? U : never;

type ExtractPathParametersFromSegment<T extends string> = IsPathParameter<T>;

type ExtractPathParameters<T extends any[]> = {
  [K in keyof T]: ExtractPathParametersFromSegment<T[K]>;
};

type TupleToUnion<T> = T extends any[] ? T[number] : never;

type ExtractSegments<TPath extends string> = SplitByDelimiter<TPath, '/'>;

type ExtractSubSegments<T extends any[]> = {
  [K in keyof T]: SplitByDelimiter<T[K], ';'>;
};

export type ExtractPathParamsWithBrackets<TPath extends string> = TupleToUnion<
  ExtractPathParameters<ExtractSubSegments<ExtractSegments<TPath>>[number]>
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
