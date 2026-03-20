---
'fets': patch
---

fix: apply `encodeURIComponent` to URL path parameters in `createClient`

Previously, path parameters were substituted into the URL as-is, which could result in malformed URLs when the parameter values contained characters such as spaces, slashes, question marks, or non-ASCII characters.

For example, passing `{ id: 'hello world' }` to `/todo/{id}` would produce `/todo/hello world` instead of `/todo/hello%20world`.

With this fix, all path parameter values are now passed through `encodeURIComponent` before being substituted into the URL, ensuring that the generated request URL is always valid and correctly encoded.
