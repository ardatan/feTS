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
  OpenAPIDocument,
  OpenAPIInfo,
  RouteHandler,
  Router,
  RouterBaseObject,
  RouterComponentsBase,
  RouterOptions,
  RouterPlugin,
  RouterSDK,
  RouteSchemas,
} from './types.js';
import { addHandlersToMethod, PatternHandlersObj } from './utils.js';
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

const EMPTY_OBJECT = {};
const EMPTY_MATCH = { pathname: { groups: {} } } as URLPatternResult;

export function createRouterBase(
  {
    fetchAPI: givenFetchAPI,
    base: basePath = '/',
    plugins = [],
    swaggerUI,
  }: RouterOptions<any, any> = {},
  openAPIDocument: OpenAPIDocument,
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
  const handlersByPatternByMethod = new Map<
    HTTPMethod,
    Map<URLPattern, RouteHandler<any, TypedRequest, TypedResponse>[]>
  >();
  const internalPatternsByMethod = new Map<HTTPMethod, Set<URLPattern>>();

  // Use this in `handle` for iteration to get better performance
  const patternHandlerObjByMethod = new Map<HTTPMethod, PatternHandlersObj<any>[]>();
  return {
    openAPIDocument,
    async handle(request: Request, context: any) {
      let url = new Proxy(EMPTY_OBJECT as URL, {
        get(_target, prop, _receiver) {
          url = new fetchAPI.URL(request.url, 'http://localhost');
          return Reflect.get(url, prop, url);
        },
      }) as URL;
      const methodPatternMaps = patternHandlerObjByMethod.get(request.method as HTTPMethod);
      if (methodPatternMaps) {
        const queryProxy = new Proxy(
          {},
          {
            get(_, prop) {
              const allQueries = url.searchParams.getAll(prop.toString());
              const val = allQueries.length === 1 ? allQueries[0] : allQueries;

              if (prop !== 'then' && (allQueries.length === 0 || val === '')) {
                return undefined;
              }

              return val;
            },
            has(_, prop) {
              return url.searchParams.has(prop.toString());
            },
          },
        );
        for (const { pattern, handlers } of methodPatternMaps) {
          // Do not parse URL if not needed
          let match: URLPatternResult | null = null;
          if (pattern.isPattern) {
            match = pattern.exec(url);
          } else if (request.url.endsWith(pattern.pathname) || url.pathname === pattern.pathname) {
            match = EMPTY_MATCH;
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
              if (handlerResult) {
                if (isLazySerializedResponse(handlerResult)) {
                  for (const onSerializeResponseHook of onSerializeResponseHooks) {
                    onSerializeResponseHook({
                      request: routerRequest,
                      path: pattern.pathname,
                      lazyResponse: handlerResult,
                      serverContext: context,
                    });
                  }
                  return (
                    handlerResult.actualResponse ||
                    fetchAPI.Response.json(handlerResult.jsonObj, handlerResult.init)
                  );
                }
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
            // Router specific
            onRouteHooks,
            openAPIDocument,
            basePath,
            fetchAPI,
            handlersByPatternByMethod,
            internalPatternsByMethod,
            patternHandlerObjByMethod,
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
          // Router specific
          onRouteHooks,
          openAPIDocument,
          basePath,
          fetchAPI,
          handlersByPatternByMethod,
          internalPatternsByMethod,
          patternHandlerObjByMethod,
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
  const oasInfo = (openAPIDocument.info ||= {} as OpenAPIInfo);
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
  const routerBaseObject = createRouterBase(finalOpts, openAPIDocument as OpenAPIDocument);
  const router = createServerAdapter(routerBaseObject, finalOpts);
  for (const onRouterInitHook of routerBaseObject.__onRouterInitHooks) {
    onRouterInitHook(router);
  }
  return router;
}
