import { parse as qsParse } from 'qs';
import * as DefaultFetchAPI from '@whatwg-node/fetch';
import { createServerAdapter, isPromise, useErrorHandling } from '@whatwg-node/server';
import landingPageRaw from './landing-page.js';
import { useDefineRoutes } from './plugins/define-routes.js';
import { useOpenAPI } from './plugins/openapi.js';
import { useTypeBox } from './plugins/typebox.js';
import { EMPTY_OBJECT } from './plugins/utils.js';
import { HTTPMethod, TypedRequest, TypedResponse } from './typed-fetch.js';
import type {
  OnRouteHandleHook,
  OnRouteHook,
  OnRouterInitHook,
  OpenAPIDocument,
  OpenAPIInfo,
  Router,
  RouterBaseObject,
  RouterComponentsBase,
  RouterOptions,
  RouterPlugin,
  RouterSDK,
  RouteSchemas,
  RouteWithSchemasOpts,
} from './types.js';
import { asyncIterationUntilReturn } from './utils.js';

export function createRouterBase(
  {
    fetchAPI: givenFetchAPI,
    base: basePath = '/',
    plugins = [],
    openAPI,
    swaggerUI,
    landingPage = true,
  }: RouterOptions<any, any> = {},
  openAPIDocument: OpenAPIDocument,
): RouterBaseObject<any, any, any> {
  const fetchAPI = givenFetchAPI
    ? {
        ...DefaultFetchAPI,
        ...givenFetchAPI,
      }
    : DefaultFetchAPI;
  const __onRouterInitHooks: OnRouterInitHook<any>[] = [];
  const onRouteHooks: OnRouteHook<any>[] = [];
  const onRouteHandleHooks: OnRouteHandleHook<any, RouterComponentsBase>[] = [];
  for (const plugin of plugins) {
    if (plugin.onRouterInit) {
      __onRouterInitHooks.push(plugin.onRouterInit);
    }
    if (plugin.onRoute) {
      onRouteHooks.push(plugin.onRoute);
    }
    if (plugin.onRouteHandle) {
      onRouteHandleHooks.push(plugin.onRouteHandle);
    }
  }
  const routeByPatternByMethod = new Map<
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
  >();
  const routeByPathByMethod = new Map<
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
  >();

  function handleUnhandledRoute(requestPath: string) {
    if (landingPage) {
      return new fetchAPI.Response(
        landingPageRaw
          .replaceAll('__BASE_PATH__', basePath)
          .replaceAll('__OAS_PATH__', openAPI?.endpoint || '/openapi.json')
          .replaceAll('__SWAGGER_UI_PATH__', swaggerUI?.endpoint || '/docs')
          .replaceAll('__REQUEST_PATH__', requestPath),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        },
      );
    }
    return undefined as any;
  }

  return {
    openAPIDocument,
    handle(request: Request, context: any) {
      let url = new Proxy(EMPTY_OBJECT as URL, {
        get(_target, prop, _receiver) {
          url = new fetchAPI.URL(request.url, 'http://localhost');
          return Reflect.get(url, prop, url);
        },
      }) as URL;
      let parsedQuery: any;
      Object.defineProperties(request, {
        parsedUrl: {
          get() {
            return url;
          },
          configurable: true,
        },
        query: {
          get() {
            if (parsedQuery == null) {
              const searchPart = request.url.split('?')[1];
              if (searchPart == null) {
                return EMPTY_OBJECT;
              }
              parsedQuery = qsParse(searchPart);
            }
            return parsedQuery;
          },
          configurable: true,
        },
      });
      const pathPatternMapByMethod = routeByPathByMethod.get(request.method as HTTPMethod);
      if (pathPatternMapByMethod) {
        const route = pathPatternMapByMethod.get(url.pathname);
        if (route) {
          for (const onRouteHandleHook of onRouteHandleHooks) {
            onRouteHandleHook({
              route,
              request: request as TypedRequest,
            });
          }
          const handlerResult$ = route.handler(request as TypedRequest, context);
          if (isPromise(handlerResult$)) {
            return handlerResult$.then(handlerResult => {
              if (handlerResult) {
                return handlerResult as Response;
              }
              return handleUnhandledRoute(request.url);
            });
          }
          if (handlerResult$) {
            return handlerResult$ as Response;
          }
        }
      }
      const methodPatternMaps = routeByPatternByMethod.get(request.method as HTTPMethod);
      if (methodPatternMaps) {
        const patternHandlerResult$ = asyncIterationUntilReturn(
          methodPatternMaps.entries(),
          ([pattern, route]) => {
            // Do not parse URL if not needed
            const match = pattern.exec(url);
            if (match != null) {
              let paramsProxy: any;
              Object.defineProperty(request, 'params', {
                get() {
                  if (paramsProxy == null) {
                    paramsProxy = new Proxy(match!.pathname.groups, {
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
                  return paramsProxy;
                },
                configurable: true,
              });
              for (const onRouteHandleHook of onRouteHandleHooks) {
                onRouteHandleHook({
                  route,
                  request: request as TypedRequest,
                });
              }
              return route.handler(request as TypedRequest, context);
            }
          },
        );
        if (isPromise(patternHandlerResult$)) {
          return patternHandlerResult$.then(patternHandlerResult => {
            if (patternHandlerResult) {
              return patternHandlerResult as Response;
            }
            return handleUnhandledRoute(request.url);
          });
        }
        if (patternHandlerResult$) {
          return patternHandlerResult$ as Response;
        }
      }
      return handleUnhandledRoute(request.url);
    },
    route(
      route: RouteWithSchemasOpts<
        any,
        RouterComponentsBase,
        RouteSchemas,
        HTTPMethod,
        string,
        TypedRequest,
        TypedResponse
      >,
    ) {
      for (const onRouteHook of onRouteHooks) {
        onRouteHook({
          basePath,
          route,
          routeByPathByMethod,
          routeByPatternByMethod,
          openAPIDocument,
          fetchAPI,
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
  const TComponents extends RouterComponentsBase = {},
  const TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse> = {
    [TKey: string]: never;
  },
>(
  options: RouterOptions<TServerContext, TComponents> = {},
): Router<TServerContext, TComponents, TRouterSDK> {
  const {
    openAPI: {
      endpoint: oasEndpoint = '/openapi.json',
      includeValidationErrors,
      ...openAPIDocument
    } = {},
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
  const plugins: RouterPlugin<TServerContext, TComponents>[] = [
    ...(oasEndpoint || swaggerUIEndpoint
      ? [
          useOpenAPI<TServerContext, TComponents>({
            oasEndpoint,
            swaggerUIEndpoint,
            swaggerUIOpts,
            includeValidationErrors,
          }),
        ]
      : []),
    useTypeBox(),
    useErrorHandling(options?.onError),
    useDefineRoutes(),
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
