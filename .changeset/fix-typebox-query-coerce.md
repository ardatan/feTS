---
'fets': patch
---

Coerce TypeBox query parameter values from strings before validation

Query strings always arrive as strings (`?limit=10` → `{ limit: '10' }`). TypeBox schemas such as
`Type.Number()` / `Type.Integer()` / `Type.Boolean()` then failed validation with `400 Bad Request`,
even for valid URL input.

The TypeBox plugin now runs `Value.Convert` on `request.query` before validating, so handlers
receive correctly typed values and numeric/boolean query params validate successfully.

```ts
createRouter().route({
  path: '/items',
  method: 'GET',
  schemas: {
    request: {
      query: Type.Object({
        limit: Type.Number(),
        active: Type.Boolean()
      })
    }
  },
  handler(request) {
    // GET /items?limit=10&active=true
    // request.query.limit === 10 (number)
    // request.query.active === true (boolean)
    return Response.json(request.query)
  }
})
```
