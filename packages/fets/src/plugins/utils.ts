export function getHeadersObj(headers: Headers) {
  const headersObj: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    headersObj[key] = value;
  }
  return headersObj;
}
