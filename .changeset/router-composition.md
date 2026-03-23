---
'fets': patch
---

Add `use()` method for router composition and merging

Routers can now be composed together using the `.use()` method, allowing you to split routes
across multiple files and merge them into a parent router.

```ts
// users-router.ts
const usersRouter = createRouter()
  .route({ path: '/users', method: 'GET', handler: () => Response.json({ users: [] }) })

// app.ts
const app = createRouter()
  .use(usersRouter)                 // merge at existing paths
  .use('/api', anotherRouter)       // merge under a prefix
```

The `.use()` method supports:
- Merging a sub-router at its existing paths
- Merging with a path prefix
- Sub-routers with their own `base` option
- Transitive composition (a merged router can itself be merged)

Internal routes (e.g. OpenAPI schema endpoint, Swagger UI) from sub-routers are not propagated
to the parent router.
