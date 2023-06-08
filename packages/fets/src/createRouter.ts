/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import * as DefaultFetchAPI from '@whatwg-node/fetch';
import { createServerAdapter } from '@whatwg-node/server';
import { useOpenAPI } from './plugins/openapi.js';
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
const EMPTY_MATCH = { pathname: { groups: {} } } as URLPatternResult;

export function createRouterBase(
  {
    fetchAPI: givenFetchAPI,
    base: basePath = '/',
    plugins = [],
    swaggerUI,
  }: RouterOptions<any, any> = {},
  openAPIDocument: OpenAPIV3_1.Document,
): RouterBaseObject<any, any, any> {
  const fetchAPI = {
    ...DefaultFetchAPI,
    ...givenFetchAPI,
  };
  const __onRouterInitHooks: OnRouterInitHook<any>[] = [];
  const onRouteHooks: OnRouteHook<any>[] = [];
  const onSerializeResponseHooks: OnSerializeResponseHook<any>[] = [];
  for (const plugin of plugins) {
    if (plugin.onRouterInit) {
      __onRouterInitHooks.push(plugin.onRouterInit);
    }
    if (plugin.onRoute) {
      onRouteHooks.push(plugin.onRoute);
    }
    if (plugin.onSerializeResponse) {
      onSerializeResponseHooks.push(plugin.onSerializeResponse);
    }
  }
  const routesByMethod = new Map<
    HTTPMethod,
    Map<URLPattern, RouteHandler<any, TypedRequest, TypedResponse>[]>
  >();
  const internalPatternsByMethod = new Map<HTTPMethod, Set<URLPattern>>();
  function addHandlersToMethod({
    operationId,
    description,
    tags,
    method,
    path,
    schemas,
    handlers,
    internal,
  }: {
    operationId?: string;
    description?: string;
    tags?: string[];
    method: HTTPMethod;
    path: string;
    schemas?: RouteSchemas;
    handlers: RouteHandler<any, TypedRequest, TypedResponse>[];
    internal?: boolean;
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
    // TODO: Better logic to make sure internal routes are always last
    let internalPatterns = internalPatternsByMethod.get(method);
    if (internal) {
      if (!internalPatterns) {
        internalPatterns = new Set();
        internalPatternsByMethod.set(method, internalPatterns);
      }
      internalPatterns.add(pattern);
    }
    if (internalPatterns?.size) {
      routesByMethod.set(
        method,
        new Map(
          [...methodPatternMaps.entries()].sort(([a], [b]) => {
            if (internalPatterns!.has(a)) {
              return 1;
            } else if (internalPatterns!.has(b)) {
              return -1;
            }
            return 0;
          }),
        ),
      );
    }
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
              if (prop !== "then" && allQueries.length === 0) {
                return undefined;
              }
              return allQueries.length === 1 ? allQueries[0] : allQueries;
            },
            has(_, prop) {
              return url.searchParams.has(prop.toString());
            },
          },
        );
        for (const [pattern, handlers] of methodPatternMaps) {
          // Do not parse URL if not needed
          let match: URLPatternResult | null = null;
          if (request.url.endsWith(pattern.pathname)) {
            match = EMPTY_MATCH;
          } else if (url.pathname === pattern.pathname) {
            match = EMPTY_MATCH;
            // Execute only if pattern is a regex
          } else {
            match = pattern.exec(url);
          }
          if (match != null) {
            const routerRequest = new Proxy(request as any, {
              get(target, prop: keyof TypedRequest) {
                if (prop === 'parsedUrl') {
                  return url;
                }
                if (prop === 'params') {
                  return new Proxy(match!.pathname.groups, {
                    get(_, prop) {
                      const value = (match!.pathname.groups as Record<string, string>)[
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
                for (const onSerializeResponseHook of onSerializeResponseHooks) {
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
      if (swaggerUI?.endpoint) {
        return new fetchAPI.Response(null, {
          status: 302,
          headers: {
            location: swaggerUI.endpoint,
          },
        });
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
      const { operationId, description, method, path, schemas, tags, internal, handler } = opts;
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
            internal,
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
          internal,
        });
      }
      return this as any;
    },
    __client: {},
    __onRouterInitHooks,
  };
}

export function createRouter<
  TServerContext,
  TComponents extends RouterComponentsBase = {},
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse> = {
    [TKey: string]: never;
  },
>(
  options: RouterOptions<TServerContext, TComponents> = {},
): Router<TServerContext, TComponents, TRouterSDK> {
  const {
    openAPI: { endpoint: oasEndpoint = '/openapi.json', ...openAPIDocument } = {},
    swaggerUI: { endpoint: swaggerUIEndpoint = '/docs', ...swaggerUIOpts } = {},
    plugins: userPlugins = [],
    base = '/',
  } = options;
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
    useZod(),
    ...userPlugins,
  ];
  const finalOpts: RouterOptions<TServerContext, TComponents> = {
    ...options,
    swaggerUI: {
      endpoint: swaggerUIEndpoint,
      ...swaggerUIOpts,
    },
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
