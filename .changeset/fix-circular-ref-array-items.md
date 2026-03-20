---
"fets": patch
---

Fix "Type of property circularly references itself" error with arrays of recursive objects

Schemas where a recursive type is referenced through an array property (e.g. `children: { type: 'array', items: { $ref: '#/components/schemas/Node' } }`) previously triggered TypeScript error TS2615 when used with `createClient` or the `OASModel` / `OASOutput` / `OASJSONResponseSchema` helpers.

The root cause was in the `Circular<T>` type helper, which only detected self-references via direct property values (`child: Node`) but not through array items (`children: Node[]`). After `NormalizeOAS` resolves `$ref`s it injects a `$id` field onto resolved schemas, making array items a *subtype* of the parent rather than the identical type. The existing equality-based check therefore returned `false` for the array case, allowing `json-schema-to-ts` to try to expand the circular type and hit TS2615.

A new `ArrayItemValue<T>` helper extracts the `items` schema from an array-typed JSON schema. The `Circular<T>` check now additionally tests whether any array-property's items extend the parent schema, correctly identifying circular array references and disabling the problematic deserializer expansion.

**Before (broken):**
```typescript
// Node.children is an array of Node — triggered TS2615
const client = createClient<NormalizeOAS<typeof oas>>({});
await client['/tree'].get(); // Error: Type of property 'children' circularly references itself
```

**After (fixed):**
```typescript
const client = createClient<NormalizeOAS<typeof oas>>({});
const res = await client['/tree'].get();
if (res.ok) {
  const body = await res.json();
  body.children?.[0]?.children?.[0]?.number; // correctly typed as number | undefined
}
```
