import { FetchAPI } from '@whatwg-node/server';
import { HTTPMethod, TypedRequest, TypedResponse } from './typed-fetch';
import { OnRouteHook, OpenAPIDocument, RouteHandler, RouteSchemas } from './types';

export interface PatternHandlersObj<TServerContext> {
  pattern: URLPattern;
  handlers: RouteHandler<TServerContext, TypedRequest, TypedResponse>[];
}

interface AddHandlerToMethodOpts<TServerContext> {
  // Operation related options

  operationId?: string;
  description?: string;
  tags?: string[];
  method: HTTPMethod;
  path: string;
  schemas?: RouteSchemas;
  handlers: RouteHandler<TServerContext, TypedRequest, TypedResponse>[];
  internal?: boolean;

  // Router related options
  onRouteHooks: OnRouteHook<TServerContext>[];
  openAPIDocument: OpenAPIDocument;
  basePath: string;
  fetchAPI: FetchAPI;

  // Internal maps and sets
  handlersByPatternByMethod: Map<
    HTTPMethod,
    Map<URLPattern, RouteHandler<TServerContext, TypedRequest, TypedResponse>[]>
  >;
  internalPatternsByMethod: Map<HTTPMethod, Set<URLPattern>>;
  patternHandlerObjByMethod: Map<HTTPMethod, PatternHandlersObj<TServerContext>[]>;
}

// This is used on runtime for optimization
function preparePatternHandlerObjByMethod<TServerContext>({
  handlersByPatternByMethod,
  patternHandlerObjByMethod,
}: {
  handlersByPatternByMethod: Map<
    HTTPMethod,
    Map<URLPattern, RouteHandler<TServerContext, TypedRequest, TypedResponse>[]>
  >;
  patternHandlerObjByMethod: Map<HTTPMethod, PatternHandlersObj<TServerContext>[]>;
}) {
  for (const [method, patternHandlersMap] of handlersByPatternByMethod) {
    const patternHandlerObjList: PatternHandlersObj<TServerContext>[] = [];
    for (const [pattern, handlers] of patternHandlersMap) {
      patternHandlerObjList.push({
        pattern,
        handlers,
      });
    }
    patternHandlerObjByMethod.set(method, patternHandlerObjList);
  }
}

declare global {
  interface URLPattern {
    isPattern?: boolean;
  }
}

export function addHandlersToMethod<TServerContext>({
  operationId,
  description,
  tags,
  method,
  path,
  schemas,
  handlers,
  internal,

  onRouteHooks,
  openAPIDocument,
  basePath,
  fetchAPI,
  handlersByPatternByMethod,
  internalPatternsByMethod,
  patternHandlerObjByMethod,
}: AddHandlerToMethodOpts<TServerContext>) {
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
  let methodPatternMaps = handlersByPatternByMethod.get(method);
  if (!methodPatternMaps) {
    methodPatternMaps = new Map();
    handlersByPatternByMethod.set(method, methodPatternMaps);
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
  pattern.isPattern = fullPath.includes(':') || fullPath.includes('*');
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
    handlersByPatternByMethod.set(
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

  preparePatternHandlerObjByMethod({
    handlersByPatternByMethod,
    patternHandlerObjByMethod,
  });
}
