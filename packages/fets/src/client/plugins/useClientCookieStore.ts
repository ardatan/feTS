import { CookieListItem, CookieStore, parse } from '@whatwg-node/cookie-store';
import { Headers } from '@whatwg-node/fetch';
import { splitSetCookieHeader } from '@whatwg-node/server';
import { ClientPlugin } from '../types';

export function useClientCookieStore(cookieStore: CookieStore): ClientPlugin {
  return {
    async onRequestInit({ requestInit }) {
      requestInit.headers = new Headers(requestInit.headers);
      let cookieHeader = requestInit.headers.get('cookie') || '';
      if (cookieHeader) {
        cookieHeader += '; ';
      }
      const cookies = await cookieStore.getAll();
      cookieHeader += cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
      requestInit.headers.set('cookie', cookieHeader);
    },
    onResponse({ response }) {
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        const setCookieHeaders = splitSetCookieHeader(setCookie);
        for (const setCookieHeader of setCookieHeaders) {
          const cookieMap = parse(setCookieHeader);
          for (const [, cookie] of cookieMap) {
            cookieStore.set(cookie as CookieListItem);
          }
        }
      }
    },
  };
}
