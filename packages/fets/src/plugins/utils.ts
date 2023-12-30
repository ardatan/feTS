export const EMPTY_OBJECT = Object.freeze({});

export function getHeadersObj(headers: Headers): Record<string, string> {
  return new Proxy(EMPTY_OBJECT, {
    get(_target, prop: string) {
      return headers.get(prop) || undefined;
    },
    set(_target, prop: string, value) {
      headers.set(prop, value);
      return true;
    },
    has(_target, prop: string) {
      return headers.has(prop);
    },
    deleteProperty(_target, prop: string) {
      headers.delete(prop);
      return true;
    },
    ownKeys() {
      return [...headers.keys()];
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      };
    },
  });
}
