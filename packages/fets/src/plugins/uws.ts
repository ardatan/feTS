import {
  getRequestFromUWSRequest,
  handleOnRequestHook,
  OnRequestHook,
  OnResponseHook,
  sendResponseToUwsOpts,
  UWSRequest,
  UWSResponse,
} from '@whatwg-node/server';
import { isLazySerializedResponse } from '../Response.js';
import { Router, RouterPlugin, RouterRequest, UWSApp } from '../types.js';

async function handleOnResponse({
  request,
  response,
  res,
  serverContext,
  onResponseHooks,
}: {
  request: RouterRequest;
  response: Response;
  res: UWSResponse;
  serverContext: any;
  onResponseHooks: OnResponseHook<any>[];
}) {
  for (const onResponseHook of onResponseHooks) {
    await onResponseHook({
      request: request as Request,
      response,
      serverContext,
    });
  }
  await sendResponseToUwsOpts({
    response,
    res,
  });
}

export function useUWS(app: UWSApp): RouterPlugin<any> {
  const onRequestHooks: OnRequestHook<any>[] = [];
  const onResponseHooks: OnResponseHook<any>[] = [];
  const requestMap = new WeakMap<UWSRequest, RouterRequest>();
  const serverContextMap = new WeakMap<UWSRequest, any>();
  let router: Router<any, {}, {}>;
  return {
    onRouterInit(_router) {
      router = _router;
      for (const plugin of router.plugins) {
        if (plugin.onRequest) {
          onRequestHooks.push(plugin.onRequest);
        }
        if (plugin.onResponse) {
          onResponseHooks.push(plugin.onResponse);
        }
      }
      app.any('/*', async function (res, req: any) {
        // Create a Request and attach it to the uWS request
        const request = getRequestFromUWSRequest({
          req,
          res,
          fetchAPI: router.fetchAPI,
        }) as RouterRequest;
        requestMap.set(req, request);
        const serverContext = {
          req,
          res,
        };
        serverContextMap.set(req, serverContext);
        const { response } = await handleOnRequestHook({
          fetchAPI: router.fetchAPI,
          request: request as Request,
          givenHandleRequest: (() => {}) as any,
          onRequestHooks,
          serverContext,
        });
        if (!response) {
          req.setYield(true);
        } else {
          await handleOnResponse({
            request,
            response,
            res,
            serverContext,
            onResponseHooks,
          });
        }
      });
    },
    onRoute({ method, path, handlers }) {
      let appMethod = method.toLowerCase();
      let normalizedPath = path;
      if (!path.startsWith('/')) {
        normalizedPath = '/' + path;
      }
      for (const handler of handlers) {
        if (!(appMethod in app)) {
          appMethod = 'any';
        }
        app[appMethod as 'post'](normalizedPath, async function (res, req: any) {
          if (appMethod === 'any') {
            if (req.getMethod().toLowerCase() !== method.toLowerCase()) {
              req.setYield(true);
              return;
            }
          }
          const request = requestMap.get(req)!;
          const serverContext = requestMap.get(req);
          let response = (await handler(request!, serverContext)) as Response;
          if (isLazySerializedResponse(response)) {
            for (const onSerializeResponseHook of router.__onSerializeResponseHooks) {
              onSerializeResponseHook({
                request,
                lazyResponse: response,
                serverContext,
              });
            }
            if (!response.serializerSet) {
              response = router.fetchAPI.Response.json(response.jsonObj, response.init);
            } else {
              response = await response.responsePromise;
            }
          }
          if (!response) {
            req.setYield(true);
          } else {
            if (response) {
              await handleOnResponse({
                request,
                response,
                res,
                serverContext,
                onResponseHooks,
              });
            }
          }
        });
      }
    },
  };
}
