---
"fets": patch
---

Fix "Type of property circularly references itself" error for mutually-recursive schemas (e.g. Argo Workflows OpenAPI spec)

Large OpenAPI specs such as Argo Workflows contain **mutually-recursive** schema references (e.g. `Template → DAGTemplate → DAGTask → Template`). These schemas caused TypeScript error TS2615 when used with `OASModel`, `OASOutput`, `OASJSONResponseSchema`, or `createClient`.

The root cause was in the `Circular<T>` type helper, which detected only:
1. Direct self-references (`child: Node` where `Node.child` resolves back to the same `Node` type)
2. Array self-references added in a previous fix (`children: Node[]`)

It did **not** detect indirect mutual recursion (Schema A → Schema B → Schema A), because the recursive type check `Circular<PropertyValue<A>>` eventually calls `Circular<A>` again, causing TypeScript to hit its recursion limit and silently fail, leaving the deserializer enabled and triggering TS2615 inside `json-schema-to-ts`.

The fix extends `Circular<T>` to also return `true` when any property of the schema is a **resolved `$ref`** — identified by the presence of a `$id` field that `NormalizeOAS` injects. Such schemas were resolved from `$ref` entries in the original OpenAPI document and may participate in complex circular reference chains. Disabling the deserializer expansion for these schemas avoids the TS2615 error.

**Before (broken):**
```typescript
// Template → DAGTemplate → DAGTask → Template caused TS2615
type NormalizedArgo = NormalizeOAS<typeof argoWorkflowsOAS>;
type TemplateType = OASModel<NormalizedArgo, 'Template'>; // Error: TS2615
const client = createClient<NormalizedArgo>({});
await client['/workflow'].get(); // Error: TS2615
```

**After (fixed):**
```typescript
type NormalizedArgo = NormalizeOAS<typeof argoWorkflowsOAS>;
type TemplateType = OASModel<NormalizedArgo, 'Template'>; // Works!
const client = createClient<NormalizedArgo>({});
const res = await client['/workflow'].get(); // Works!
if (res.ok) {
  const body = await res.json();
  body.dag?.tasks?.[0]?.name; // correctly typed as string | undefined
}
```
