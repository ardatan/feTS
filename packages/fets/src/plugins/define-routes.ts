/* eslint-disable no-inner-declarations */
import { HTTPMethod } from '../typed-fetch';
import { RouterComponentsBase, RouterPlugin } from '../types';

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

export function useDefineRoutes<
  TServerContext,
  TComponents extends RouterComponentsBase,
>(): RouterPlugin<TServerContext, TComponents> {
  return {
    onRoute({ basePath, route, routeByPathByMethod, routeByPatternByMethod }) {
      let fullPath = '';
      if (basePath === '/') {
        fullPath = route.path;
      } else if (route.path === '/') {
        fullPath = basePath;
      } else {
        fullPath = `${basePath}${route.path}`;
      }
      if (fullPath.includes(':') || fullPath.includes('*')) {
        const pattern = new URLPattern({ pathname: fullPath });
        function addHandler(method: HTTPMethod) {
          let methodPatternMaps = routeByPatternByMethod.get(method);
          if (!methodPatternMaps) {
            methodPatternMaps = new Map();
            routeByPatternByMethod.set(method, methodPatternMaps);
          }
          methodPatternMaps.set(pattern, route);
        }
        if (!route.method) {
          for (const method of HTTP_METHODS) {
            addHandler(method);
          }
        } else {
          addHandler(route.method);
        }
      } else {
        function addHandler(method: HTTPMethod) {
          let methodPathMaps = routeByPathByMethod.get(method);
          if (!methodPathMaps) {
            methodPathMaps = new Map();
            routeByPathByMethod.set(method, methodPathMaps);
          }
          methodPathMaps.set(fullPath, route);
        }
        if (!route.method) {
          for (const method of HTTP_METHODS) {
            addHandler(method);
          }
        } else {
          addHandler(route.method);
        }
      }
    },
  };
}
