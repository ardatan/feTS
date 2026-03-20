---
"fets": patch
---

Allow optional request bodies in OpenAPI spec by respecting TypeBox `Type.Optional` modifier

Previously, the OpenAPI plugin hardcoded `requestBody.required = true` for all JSON and formData request bodies, making it impossible to declare optional bodies using `Type.Optional<...>` or similar patterns from TypeBox.

The plugin now checks for the TypeBox `OptionalKind` symbol on the schema and sets `requestBody.required` accordingly. Non-TypeBox schemas and non-optional schemas continue to produce `required: true` (preserving backward compatibility), while schemas wrapped with `Type.Optional(...)` correctly produce `required: false`.

```typescript
router.route({
  path: '/example',
  method: 'POST',
  schemas: {
    request: {
      json: Type.Optional(Type.Object({ name: Type.String() })),
    },
  },
  handler: () => Response.json({ ok: true }),
});
// → requestBody.required === false in the generated OpenAPI spec
```
