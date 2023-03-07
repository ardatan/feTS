import * as DefaultFetchAPI from '@whatwg-node/fetch';
import { createServerAdapter } from '@whatwg-node/server';
import { useAjv } from './internal-plugins/ajv.js';
import { useOpenAPI } from './internal-plugins/openapi.js';
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
  RouterOptions,
  RouterSDK,
  RouteSchemas,
} from './types.js';

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

export function createRouterBase({
  fetchAPI: givenFetchAPI,
  base: basePath = '/',
  plugins = [],
}: RouterOptions<any> = {}): RouterBaseObject<any, any> {
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
  const routesByMethod = new Map<HTTPMethod, Map<URLPattern, RouteHandler<any>[]>>();
  function addHandlersToMethod({
    operationId,
    description,
    method,
    path,
    schemas,
    handlers,
  }: {
    operationId?: string;
    description?: string;
    method: HTTPMethod;
    path: string;
    schemas?: RouteSchemas;
    handlers: RouteHandler<any>[];
  }) {
    for (const onRouteHook of onRouteHooks) {
      onRouteHook({
        operationId,
        description,
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
    async handle(request: Request, context: any) {
      let _parsedUrl: URL;
      function getParsedUrl() {
        if (!_parsedUrl) {
          _parsedUrl = new fetchAPI.URL(request.url, 'http://localhost');
        }
        return _parsedUrl;
      }
      const methodPatternMaps = routesByMethod.get(request.method as HTTPMethod);
      if (methodPatternMaps) {
        const queryProxy = new Proxy(
          {},
          {
            get(_, prop) {
              const parsedUrl = getParsedUrl();
              const allQueries = parsedUrl.searchParams.getAll(prop.toString());
              return allQueries.length === 1 ? allQueries[0] : allQueries;
            },
            has(_, prop) {
              const parsedUrl = getParsedUrl();
              return parsedUrl.searchParams.has(prop.toString());
            },
          },
        );
        for (const [pattern, handlers] of methodPatternMaps) {
          // Do not parse URL if not needed
          const match = request.url.endsWith(pattern.pathname)
            ? { pathname: { groups: {} } }
            : pattern.exec(getParsedUrl());
          if (match) {
            const routerRequest = new Proxy(request as any, {
              get(target, prop: keyof TypedRequest) {
                if (prop === 'parsedUrl') {
                  return getParsedUrl();
                }
                if (prop === 'params') {
                  return new Proxy(match.pathname.groups, {
                    get(_, prop) {
                      const value = match.pathname.groups[prop.toString()] as any;
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
                const targetProp = target[prop] as any;
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
      return new fetchAPI.Response(null, { status: 404 });
    },
    route(
      opts: AddRouteWithSchemasOpts<
        any,
        RouteSchemas,
        HTTPMethod,
        string,
        TypedRequest,
        TypedResponse
      >,
    ) {
      const { operationId, description, method, path, schemas, handler } = opts;
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
  TRouterSDK extends RouterSDK<string, TypedRequest, TypedResponse> = {
    [TKey: string]: never;
  },
>({
  title = 'FETS API',
  description = 'An API written with FETS',
  version = '1.0.0',
  oasEndpoint = '/openapi.json',
  swaggerUIEndpoint = '/docs',
  plugins: userPlugins = [],
  ...options
}: RouterOptions<TServerContext> = {}): Router<TServerContext, TRouterSDK> {
  const plugins = [
    ...(oasEndpoint || swaggerUIEndpoint
      ? [
          useOpenAPI({
            oasEndpoint,
            swaggerUIEndpoint,
            baseOas: {
              openapi: '3.0.1',
              info: {
                title,
                description,
                version,
              },
              components: {},
            },
          }),
        ]
      : []),
    useAjv(),
    ...userPlugins,
  ];
  const finalOpts = {
    ...options,
    plugins,
  };
  const routerBaseObject = createRouterBase(finalOpts);
  const router = createServerAdapter(routerBaseObject, finalOpts);
  for (const onRouterInitHook of routerBaseObject.__onRouterInitHooks) {
    onRouterInitHook(router);
  }
  return router;
}
