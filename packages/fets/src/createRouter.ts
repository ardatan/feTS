/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import * as DefaultFetchAPI from '@whatwg-node/fetch';
import { createServerAdapter } from '@whatwg-node/server';
import { useOpenAPI } from './plugins/openapi.js';
import { useUWS } from './plugins/uws.js';
import { isLazySerializedResponse } from './Response.js';
import { HTTPMethod, TypedRequest, TypedResponse } from './typed-fetch.js';
import type {
  AddRouteWithSchemasOpts,
  OnRouteHook,
  OnRouterInitHook,
  OnSerializeResponseHook,
  RouteHandler,
  Router,
  RouterBaseObject,
  RouterComponentsBase,
  RouterOptions,
  RouterPlugin,
  RouterSDK,
  RouteSchemas,
} from './types.js';
import { useZod } from './zod/zod.js';

const HTTP_METHODS: HTTPMethod[] = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH',
];

const urlByRequest = new WeakMap<Request, URL>();

export function createRouterBase(
  { fetchAPI: givenFetchAPI, base: basePath = '/', plugins = [] }: RouterOptions<any, any> = {},
  openAPIDocument: OpenAPIV3_1.Document,
): RouterBaseObject<any, any, any> {
  const fetchAPI = {
    ...DefaultFetchAPI,
    ...givenFetchAPI,
  };
  const __onRouterInitHooks: OnRouterInitHook<any>[] = [];
  const onRouteHooks: OnRouteHook<any>[] = [];
  const __onSerializeResponseHooks: OnSerializeResponseHook<any>[] = [];
  for (const plugin of plugins) {
    if (plugin.onRouterInit) {
      __onRouterInitHooks.push(plugin.onRouterInit);
    }
    if (plugin.onRoute) {
      onRouteHooks.push(plugin.onRoute);
    }
    if (plugin.onSerializeResponse) {
      __onSerializeResponseHooks.push(plugin.onSerializeResponse);
    }
  }
  const routesByMethod = new Map<
    HTTPMethod,
    Map<URLPattern, RouteHandler<any, TypedRequest, TypedResponse>[]>
  >();
  function addHandlersToMethod({
    operationId,
    description,
    tags,
    method,
    path,
    schemas,
    handlers,
  }: {
    operationId?: string;
    description?: string;
    tags?: string[];
    method: HTTPMethod;
    path: string;
    schemas?: RouteSchemas;
    handlers: RouteHandler<any, TypedRequest, TypedResponse>[];
  }) {
    for (const onRouteHook of onRouteHooks) {
      onRouteHook({
        operationId,
        description,
        tags,
        openAPIDocument,
        method,
        path,
        schemas,
        handlers,
      });
    }
    let methodPatternMaps = routesByMethod.get(method);
    if (!methodPatternMaps) {
      methodPatternMaps = new Map();
      routesByMethod.set(method, methodPatternMaps);
    }
    let fullPath = '';
    if (basePath === '/') {
      fullPath = path;
    } else if (path === '/') {
      fullPath = basePath;
    } else {
      fullPath = `${basePath}${path}`;
    }
    const pattern = new fetchAPI.URLPattern({ pathname: fullPath });
    methodPatternMaps.set(pattern, handlers);
  }
  return {
    openAPIDocument,
    async handle(request: Request, context: any) {
      const url = urlByRequest.get(request);
      if (!url) {
        throw new Error('Request not from this router');
      }
      const methodPatternMaps = routesByMethod.get(request.method as HTTPMethod);
      if (methodPatternMaps) {
        const queryProxy = new Proxy(
          {},
          {
            get(_, prop) {
              const allQueries = url.searchParams.getAll(prop.toString());
              return allQueries.length === 1 ? allQueries[0] : allQueries;
            },
            has(_, prop) {
              return url.searchParams.has(prop.toString());
            },
          },
        );
        for (const [pattern, handlers] of methodPatternMaps) {
          // Do not parse URL if not needed
          const match =
            request.url.endsWith(pattern.pathname) || url.pathname === pattern.pathname
              ? { pathname: { groups: {} } }
              : pattern.exec(url);
          if (match) {
            const routerRequest = new Proxy(request as any, {
              get(target, prop: keyof TypedRequest) {
                if (prop === 'parsedUrl') {
                  return url;
                }
                if (prop === 'params') {
                  return new Proxy(match.pathname.groups, {
                    get(_, prop) {
                      const value = (match.pathname.groups as Record<string, string>)[
                        prop.toString()
                      ];
                      if (value != null) {
                        return decodeURIComponent(value);
                      }
                      return value;
                    },
                  });
                }
                if (prop === 'query') {
                  return queryProxy;
                }
                const targetProp = target[prop];
                if (typeof targetProp === 'function') {
                  return targetProp.bind(target);
                }
                return targetProp;
              },
              has(target, prop) {
                return (
                  prop in target || prop === 'parsedUrl' || prop === 'params' || prop === 'query'
                );
              },
            });
            for (const handler of handlers) {
              const handlerResult = await handler(routerRequest, context);
              if (isLazySerializedResponse(handlerResult)) {
                for (const onSerializeResponseHook of __onSerializeResponseHooks) {
                  onSerializeResponseHook({
                    request: routerRequest,
                    lazyResponse: handlerResult,
                    serverContext: context,
                  });
                }
                if (!handlerResult.serializerSet) {
                  return fetchAPI.Response.json(handlerResult.jsonObj, handlerResult.init);
                }
                return handlerResult.responsePromise;
              } else if (handlerResult) {
                return handlerResult;
              }
            }
          }
        }
      }
      return new fetchAPI.Response(null, { status: 404 });
    },
    route(
      opts: AddRouteWithSchemasOpts<
        any,
        any,
        RouteSchemas,
        HTTPMethod,
        string,
        TypedRequest,
        TypedResponse
      >,
    ) {
      const { operationId, description, method, path, schemas, tags, handler } = opts;
      const handlers = Array.isArray(handler) ? handler : [handler];
      if (!method) {
        for (const method of HTTP_METHODS) {
          addHandlersToMethod({
            operationId,
            description,
            method,
            path,
            schemas,
            handlers,
            tags,
          });
        }
      } else {
        addHandlersToMethod({
          operationId,
          description,
          method,
          path,
          schemas,
          handlers,
          tags,
        });
      }
      return this as any;
    },
    __client: {},
    __onRouterInitHooks,
    __onSerializeResponseHooks,
    plugins,
    fetchAPI,
  };
}

export function createRouter<
  TServerContext,
  TComponents extends RouterComponentsBase = {},
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse> = {
    [TKey: string]: never;
  },
>({
  openAPI: { endpoint: oasEndpoint = '/openapi.json', ...openAPIDocument } = {},
  swaggerUI: { endpoint: swaggerUIEndpoint = '/docs', ...swaggerUIOpts } = {},
  plugins: userPlugins = [],
  base = '/',
  app,
  ...options
}: RouterOptions<TServerContext, TComponents> = {}): Router<
  TServerContext,
  TComponents,
  TRouterSDK
> {
  openAPIDocument.openapi = openAPIDocument.openapi || '3.0.1';
  const oasInfo = (openAPIDocument.info ||= {} as OpenAPIV3_1.InfoObject);
  oasInfo.title ||= 'feTS API';
  oasInfo.description ||= 'An API written with feTS';
  oasInfo.version ||= '1.0.0';
  if (base !== '/') {
    openAPIDocument.servers = openAPIDocument.servers || [
      {
        url: base,
      },
    ];
  }
  const plugins: RouterPlugin<TServerContext>[] = [
    {
      onRequest({ request, url }) {
        urlByRequest.set(request, url);
      },
    },
    ...(oasEndpoint || swaggerUIEndpoint
      ? [
          useOpenAPI({
            oasEndpoint,
            swaggerUIEndpoint,
            swaggerUIOpts,
          }),
        ]
      : []),
    ...(app ? [useUWS(app)] : []),
    useZod(),
    ...userPlugins,
  ];
  const finalOpts = {
    ...options,
    base,
    plugins,
  };
  const routerBaseObject = createRouterBase(finalOpts, openAPIDocument as OpenAPIV3_1.Document);
  const router = createServerAdapter(routerBaseObject, finalOpts);
  for (const onRouterInitHook of routerBaseObject.__onRouterInitHooks) {
    onRouterInitHook(router);
  }
  return router;
}
