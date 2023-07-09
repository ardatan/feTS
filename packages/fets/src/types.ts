import {
  FromSchema as FromSchemaOriginal,
  JSONSchema as JSONSchemaOrBoolean,
} from 'json-schema-to-ts';
import {
  ServerAdapter,
  ServerAdapterOptions,
  ServerAdapterPlugin,
  ServerAdapterRequestHandler,
} from '@whatwg-node/server';
import { SwaggerUIOpts } from './plugins/openapi.js';
import { LazySerializedResponse } from './Response.js';
import type {
  HTTPMethod,
  StatusCode,
  TypedRequest,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from './typed-fetch.js';
import {
  AddRouteWithZodSchemasOpts,
  RouteZodSchemas,
  TypedRequestFromRouteZodSchemas,
  TypedResponseFromRouteZodSchemas,
} from './zod/types.js';

export { TypedRequest as RouterRequest };

export type JSONSerializer = (obj: any) => string;

export type JSONSchema = Exclude<JSONSchemaOrBoolean, boolean>;

export interface OpenAPIInfo {
  title?: string;
  description?: string;
  version?: string;
}

export type OpenAPIPathObject = Record<string, OpenAPIOperationObject>;

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
  servers?: {
    url: string;
  }[];
  paths?: Record<string, OpenAPIPathObject>;
  components?: unknown;
};

export interface RouterOpenAPIOptions<TComponents extends RouterComponentsBase>
  extends OpenAPIDocument {
  endpoint?: string | false;
  components?: TComponents;
}

export interface RouterSwaggerUIOptions extends SwaggerUIOpts {
  endpoint?: string | false;
}

export interface RouterOptions<TServerContext, TComponents extends RouterComponentsBase>
  extends ServerAdapterOptions<TServerContext> {
  base?: string;
  plugins?: RouterPlugin<TServerContext>[];

  openAPI?: RouterOpenAPIOptions<TComponents>;
  swaggerUI?: RouterSwaggerUIOptions;
}

export type RouterComponentsBase = {
  schemas?: Record<string, JSONSchema>;
};

export type FromSchema<T> = T extends JSONSchema
  ? FromSchemaOriginal<
      T,
      {
        deserialize: [
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
            output: bigint;
          },
          {
            pattern: {
              type: 'integer';
              format: 'int64';
            };
            output: bigint;
          },
        ];
      }
    >
  : never;

export type FromRouterComponentSchema<
  TRouter extends Router<any, any, any>,
  TName extends string,
> = TRouter extends Router<any, infer TComponents, any>
  ? TComponents extends Required<RouterComponentsBase>
    ? FromSchema<TComponents['schemas'][TName]>
    : never
  : never;

export type PromiseOrValue<T> = T | Promise<T>;

export type StatusCodeMap<T> = {
  [TKey in StatusCode]?: T;
};

export type TypedRouterHandlerTypeConfig<
  TRequestJSON = any,
  TRequestFormData extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>,
  TRequestHeaders extends Record<string, string> = Record<string, string>,
  TRequestQueryParams extends Record<string, string | string[]> = Record<string, string | string[]>,
  TRequestPathParams extends Record<string, any> = Record<string, any>,
  TResponseJSONStatusMap extends StatusCodeMap<any> = StatusCodeMap<any>,
> = {
  request: {
    json?: TRequestJSON;
    formData?: TRequestFormData;
    headers?: TRequestHeaders;
    query?: TRequestQueryParams;
    params?: TRequestPathParams;
  };
  responses?: TResponseJSONStatusMap;
};

export type TypedRequestFromTypeConfig<
  TMethod extends HTTPMethod,
  TTypeConfig extends TypedRouterHandlerTypeConfig,
> = TTypeConfig extends { request: Required<TypedRouterHandlerTypeConfig>['request'] }
  ? TTypeConfig extends TypedRouterHandlerTypeConfig<
      infer TRequestJSON,
      infer TRequestFormData,
      infer TRequestHeaders,
      infer TRequestQueryParams,
      infer TRequestPathParams
    >
    ? TypedRequest<
        TRequestJSON,
        TRequestFormData,
        TRequestHeaders,
        TMethod,
        TRequestQueryParams,
        TRequestPathParams
      >
    : never
  : TypedRequest;

export type TypedResponseFromTypeConfig<TTypeConfig extends TypedRouterHandlerTypeConfig> =
  TTypeConfig extends {
    responses: infer TResponses;
  }
    ? TResponses extends StatusCodeMap<any>
      ? TypedResponseWithJSONStatusMap<TResponses>
      : never
    : TypedResponse;

export interface RouterBaseObject<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse>,
> {
  openAPIDocument: OpenAPIDocument;
  handle: ServerAdapterRequestHandler<TServerContext>;
  route<
    TRouteSchemas extends RouteSchemas,
    TMethod extends HTTPMethod,
    TPath extends string,
    TTypedRequest extends TypedRequestFromRouteSchemas<TComponents, TRouteSchemas, TMethod>,
    TTypedResponse extends TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>,
  >(
    opts: AddRouteWithSchemasOpts<
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
    TRouteZodSchemas extends RouteZodSchemas,
    TMethod extends HTTPMethod,
    TPath extends string,
    TTypedRequest extends TypedRequestFromRouteZodSchemas<TRouteZodSchemas, TMethod>,
    TTypedResponse extends TypedResponseFromRouteZodSchemas<TRouteZodSchemas>,
  >(
    opts: AddRouteWithZodSchemasOpts<
      TServerContext,
      TRouteZodSchemas,
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
    TTypeConfig extends TypedRouterHandlerTypeConfig,
    TMethod extends HTTPMethod = HTTPMethod,
    TTypedRequest extends TypedRequestFromTypeConfig<
      TMethod,
      TTypeConfig
    > = TypedRequestFromTypeConfig<TMethod, TTypeConfig>,
    TTypedResponse extends TypedResponseFromTypeConfig<TTypeConfig> = TypedResponseFromTypeConfig<TTypeConfig>,
    TPath extends string = string,
  >(
    opts: AddRouteWithTypesOpts<TServerContext, TMethod, TPath, TTypedRequest, TTypedResponse>,
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

export type RouteHandler<
  TServerContext,
  TTypedRequest extends TypedRequest,
  TTypedResponse extends TypedResponse,
> = (
  request: TTypedRequest,
  context: TServerContext,
) => PromiseOrValue<TTypedResponse | Response | void>;
// TODO: Remove Response from here

export type OnRouteHookPayload<TServerContext> = {
  operationId?: string;
  description?: string;
  tags?: string[];
  method: HTTPMethod;
  path: string;
  schemas?: RouteSchemas | RouteZodSchemas;
  openAPIDocument: OpenAPIDocument;
  handlers: RouteHandler<TServerContext, TypedRequest, TypedResponse>[];
};

export type OnRouterInitHook<TServerContext> = (router: Router<TServerContext, any, any>) => void;

export type OnSerializeResponsePayload<TServerContext> = {
  request: TypedRequest;
  path: string;
  serverContext: TServerContext;
  lazyResponse: LazySerializedResponse;
};

export type OnSerializeResponseHook<TServerContext> = (
  payload: OnSerializeResponsePayload<TServerContext>,
) => void;

export type RouterPlugin<TServerContext> = ServerAdapterPlugin<TServerContext> & {
  onRouterInit?: OnRouterInitHook<TServerContext>;
  onRoute?: OnRouteHook<TServerContext>;
  onSerializeResponse?: OnSerializeResponseHook<TServerContext>;
};

export type RouteSchemas = {
  request?: {
    headers?: JSONSchema;
    params?: JSONSchema;
    query?: JSONSchema;
    json?: JSONSchema;
    formData?: JSONSchema;
  };
  responses?: StatusCodeMap<JSONSchema>;
};

export type RouterSDKOpts<
  TTypedRequest extends TypedRequest = TypedRequest,
  TMethod extends HTTPMethod = HTTPMethod,
> = TTypedRequest extends TypedRequest<
  infer TJSONBody,
  infer TFormData,
  infer THeaders,
  TMethod,
  infer TQueryParams,
  infer TPathParam
>
  ? {
      json?: TJSONBody;
      formData?: TFormData;
      headers?: THeaders;
      query?: TQueryParams;
      params?: TPathParam;
    }
  : never;

export type RouterSDK<
  TPath extends string = string,
  TTypedRequest extends TypedRequest = TypedRequest,
  TTypedResponse extends TypedResponse = TypedResponse,
> = {
  [TPathKey in TPath]: {
    [TMethod in Lowercase<TTypedRequest['method']>]: (
      opts?: RouterSDKOpts<TTypedRequest, TTypedRequest['method']>,
    ) => Promise<Exclude<TTypedResponse, undefined>>;
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
> = TRouteSchemas extends { request: Required<RouteSchemas>['request'] }
  ? TypedRequest<
      TRouteSchemas['request'] extends { json: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['json']>
        : any,
      TRouteSchemas['request'] extends { formData: JSONSchema }
        ? FromSchemaWithComponents<
            TComponents,
            TRouteSchemas['request']['formData']
          > extends Record<string, FormDataEntryValue>
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['formData']>
          : Record<string, FormDataEntryValue>
        : Record<string, FormDataEntryValue>,
      TRouteSchemas['request'] extends { headers: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']>
          : Record<string, string>
        : Record<string, string>,
      TMethod,
      TRouteSchemas['request'] extends { query: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['query']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['query']>
          : Record<string, string | string[]>
        : Record<string, string | string[]>,
      TRouteSchemas['request'] extends { params: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']>
          : Record<string, any>
        : Record<string, any>
    >
  : TypedRequest<any, Record<string, FormDataEntryValue>, Record<string, string>, TMethod>;

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

export type AddRouteWithSchemasOpts<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouteSchemas extends RouteSchemas,
  TMethod extends HTTPMethod,
  TPath extends string,
  TTypedRequest extends TypedRequestFromRouteSchemas<TComponents, TRouteSchemas, TMethod>,
  TTypedResponse extends TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>,
> = {
  schemas: TRouteSchemas;
} & AddRouteWithTypesOpts<TServerContext, TMethod, TPath, TTypedRequest, TTypedResponse>;

export type AddRouteWithTypesOpts<
  TServerContext,
  TMethod extends HTTPMethod,
  TPath extends string,
  TTypedRequest extends TypedRequest,
  TTypedResponse extends TypedResponse,
> = {
  operationId?: string;
  description?: string;
  method?: TMethod;
  tags?: string[];
  internal?: boolean;
  path: TPath;
  handler:
    | RouteHandler<TServerContext, TTypedRequest, TTypedResponse>
    | RouteHandler<TServerContext, TTypedRequest, TTypedResponse>[];
};

export type RouteInput<
  TRouter extends Router<any, any, {}>,
  TPath extends string,
  TMethod extends Lowercase<HTTPMethod> = 'post',
  TParamType extends keyof RouterSDKOpts = 'json',
> = TRouter extends Router<any, any, infer TRouterSDK>
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
> = TRouter extends Router<any, any, infer TRouterSDK>
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

export type RouterComponentSchema<
  TRouter extends Router<any, any, any>,
  TName extends string,
> = TRouter extends Router<any, infer TComponents, any>
  ? TComponents extends { schemas: Record<string, JSONSchema> }
    ? FromSchema<TComponents['schemas'][TName]>
    : never
  : never;
