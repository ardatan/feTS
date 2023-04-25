import { CookieStore } from '@whatwg-node/cookie-store';
import { ClientPlugin } from '../types';

export function useClientCookieStore(cookieStore: CookieStore): ClientPlugin {
  return {
    onRequestInit({ requestInit }) {
      requestInit.headers = {
        ...requestInit.headers,
        cookie: cookieStore.cookieString,
      };
    },
    onResponse({ response }) {
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        cookieStore.cookieString = setCookie;
      }
    },
  };
}
