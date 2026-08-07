---
'fets': patch
---

Fix `globalParams` so standard `RequestInit` fields (e.g. `credentials`, `mode`) are applied to every request

`createClient({ globalParams })` previously only merged feTS-specific fields (`headers`, `query`,
`params`, `json`, `formData`, `formUrlEncoded`). Values like `credentials: 'include'` were silently
ignored, even though they are part of `ClientRequestParams` / `RequestInit`.

The client now spreads the remaining `RequestInit` options from `globalParams` into each request.
Per-request options still win over global ones.

```ts
const client = createClient<NormalizeOAS<typeof spec>>({
  endpoint: 'https://api.example.com',
  globalParams: {
    credentials: 'include',
    headers: { Authorization: 'Bearer …' }
  }
})
```
