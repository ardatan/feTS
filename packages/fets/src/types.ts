/* eslint-disable camelcase */
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
import { LazySerializedResponse } from './Response.js';
import type {
  HTTPMethod,
  TypedRequest,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from './typed-fetch.js';

export { TypedRequest as RouterRequest };

export type JSONSerializer = (obj: any) => string;

export type JSONSchema = Exclude<JSONSchemaOrBoolean, boolean>;

export interface RouterOptions<TServerContext, TComponents extends RouterComponentsBase>
  extends ServerAdapterOptions<TServerContext> {
  base?: string;
  plugins?: RouterPlugin<TServerContext>[];

  // OAS Related
  title?: string;
  description?: string;
  version?: string;
  oasEndpoint?: string | false;
  swaggerUIEndpoint?: string | false;
  components?: TComponents;
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

export type TypedRouterHandlerTypeConfig<
  TRequestJSON = any,
  TRequestFormData extends Record<string, FormDataEntryValue> = Record<string, FormDataEntryValue>,
  TRequestHeaders extends Record<string, string> = Record<string, string>,
  TRequestQueryParams extends Record<string, string | string[]> = Record<string, string | string[]>,
  TRequestPathParams extends Record<string, any> = Record<string, any>,
  TResponseJSONStatusMap extends Record<number, any> = Record<number, any>,
> = {
  request: {
    json?: TRequestJSON;
    formData?: TRequestFormData;
    headers?: TRequestHeaders;
    query?: TRequestQueryParams;
    params?: TRequestPathParams;
  };
  responses: TResponseJSONStatusMap;
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
    ? TResponses extends Record<number, any>
      ? TypedResponseWithJSONStatusMap<TResponses>
      : never
    : TypedResponse;

export interface RouterBaseObject<
  TServerContext,
  TComponents extends RouterComponentsBase,
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse>,
> {
  handle: ServerAdapterRequestHandler<TServerContext>;
  route<
    TRouteSchemas extends RouteSchemas,
    TMethod extends HTTPMethod,
    TPath extends string,
    TTypedRequest extends TypedRequestFromRouteSchemas<TComponents, TRouteSchemas, TMethod>,
  >(
    opts: AddRouteWithSchemasOpts<
      TServerContext,
      TComponents,
      TRouteSchemas,
      TMethod,
      TPath,
      TTypedRequest
    >,
  ): Router<
    TServerContext,
    TComponents,
    TRouterSDK &
      RouterSDK<TPath, TTypedRequest, TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>>
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
    opts: AddRouteWithTypesOpts<TServerContext, TTypedRequest, TTypedResponse, TMethod, TPath>,
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
  TTypedRequest extends TypedRequest = TypedRequest,
  TTypedResponse extends TypedResponse = TypedResponse,
> = (request: TTypedRequest, context: TServerContext) => PromiseOrValue<TTypedResponse | void>;

export type OnRouteHookPayload<TServerContext> = {
  operationId?: string;
  description?: string;
  method: HTTPMethod;
  path: string;
  schemas?: RouteSchemas;
  handlers: RouteHandler<TServerContext>[];
};

export type OnRouterInitHook<TServerContext> = (router: Router<TServerContext, any, any>) => void;

export type OnSerializeResponsePayload<TServerContext> = {
  request: TypedRequest;
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
  responses?: Record<number, JSONSchema>;
};

type FilteredKeys<T> = {
  // this does not work
  // [K in keyof T]: K

  // this do
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

type RemoveNever<T> = {
  [K in FilteredKeys<T>]: T[K];
};

export type RouterSDKOpts<
  TTypedRequest extends TypedRequest = TypedRequest,
  TMethod extends HTTPMethod = HTTPMethod,
> = RemoveNever<
  TTypedRequest extends TypedRequest<
    infer TJSONBody,
    infer TFormData,
    infer THeaders,
    TMethod,
    infer TQueryParams,
    infer TPathParam
  >
    ? {
        json: TJSONBody;
        formData: TFormData extends Record<string, never> ? never : TFormData;
        headers: THeaders extends Record<string, never> ? never : THeaders;
        query: TQueryParams extends Record<string, never> ? never : TQueryParams;
        params: TPathParam extends Record<string, never> ? never : TPathParam;
      }
    : never
>;

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
        : never,
      TRouteSchemas['request'] extends { formData: JSONSchema }
        ? FromSchemaWithComponents<
            TComponents,
            TRouteSchemas['request']['formData']
          > extends Record<string, FormDataEntryValue>
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['formData']>
          : Record<string, never>
        : Record<string, never>,
      TRouteSchemas['request'] extends { headers: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['headers']>
          : Record<string, never>
        : Record<string, never>,
      TMethod,
      TRouteSchemas['request'] extends { query: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['query']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['query']>
          : Record<string, never>
        : Record<string, never>,
      TRouteSchemas['request'] extends { params: JSONSchema }
        ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']> extends Record<
            string,
            string
          >
          ? FromSchemaWithComponents<TComponents, TRouteSchemas['request']['params']>
          : Record<string, never>
        : Record<string, never>
    >
  : TypedRequest;

export type TypedResponseFromRouteSchemas<
  TComponents extends RouterComponentsBase,
  TRouteSchemas extends RouteSchemas,
> = TRouteSchemas extends { responses: Record<number, JSONSchema> }
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
> = {
  operationId?: string;
  description?: string;
  schemas: TRouteSchemas;
} & AddRouteWithTypesOpts<
  TServerContext,
  TTypedRequest,
  TypedResponseFromRouteSchemas<TComponents, TRouteSchemas>,
  TMethod,
  TPath
>;

export type AddRouteWithTypesOpts<
  TServerContext,
  TTypedRequest extends TypedRequest,
  TTypedResponse extends TypedResponse,
  TMethod extends HTTPMethod,
  TPath extends string,
> = {
  method?: TMethod | Uppercase<TMethod>;
  path: TPath;
  handler:
    | RouteHandler<TServerContext, TTypedRequest, TTypedResponse>
    | RouteHandler<TServerContext, TTypedRequest, TTypedResponse>[];
};

export type RouteInput<
  TRouter extends Router<any, any, {}>,
  TPath extends string,
  TMethod extends Lowercase<HTTPMethod>,
  TParamType extends keyof RouterSDKOpts,
> = TRouter extends Router<any, any, infer TRouterSDK>
  ? TRouterSDK[TPath][TMethod] extends (requestParams?: infer TRequestParams) => any
    ? TRequestParams extends {
        [TParamTypeKey in TParamType]: infer TParamTypeValue;
      }
      ? TParamTypeValue
      : never
    : never
  : never;

export type RouteOutput<
  TRouter extends Router<any, any, {}>,
  TPath extends string,
  TMethod extends Lowercase<HTTPMethod>,
  TStatusCode extends number = 200,
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

export type RouterComponentSchema<
  TRouter extends Router<any, any, any>,
  TName extends string,
> = TRouter extends Router<any, infer TComponents, any>
  ? TComponents extends { schemas: Record<string, JSONSchema> }
    ? FromSchema<TComponents['schemas'][TName]>
    : never
  : never;
