---
'fets': patch
---

Fix `createClient` path parameter substitution for falsy values, colon-param boundaries, and repeated placeholders

`createClient` previously used `if (value)` when substituting `params` into the request path, so falsy values like `0`, `false`, and `""` left `{id}` / `:id` unreplaced. Colon-style replacements also matched parameter-name prefixes (so `:id` corrupted `:idx`) and only replaced the first occurrence of a placeholder.

Path params are now substituted whenever the value is not `null`/`undefined`, `{name}` uses `replaceAll`, and `:name` is matched as a whole token with a global, boundary-aware regex.

```ts
await client['/users/{id}'].get({ params: { id: 0 } })
// → /users/0

await client['/items/:idx/:id'].get({ params: { id: 5, idx: 9 } })
// → /items/9/5

await client['/orgs/{id}/members/{id}'].get({ params: { id: 1 } })
// → /orgs/1/members/1
```
