import { HTTPError, RouterPlugin, Type } from 'fets';

export const TOKEN = '1234-5678-9123-4567';

export const bearerAuthPlugin: RouterPlugin<any, any> = {
  onRouteHandle({ route, request }) {
    if (
      route.security?.find(securityDef => securityDef['myExampleAuth']) &&
      request.headers.get('authorization') !== `Bearer ${TOKEN}`
    ) {
      throw new HTTPError(
        401,
        'Unauthorized',
        {},
        {
          message: 'Invalid bearer token',
        },
      );
    }
  },
};

export const UnauthorizedSchema = Type.Object({
  message: Type.String(),
});
