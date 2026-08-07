---
'fets': patch
---

Fix TS2615 circular reference errors for OpenAPI schemas that use `anyOf` / `oneOf` with recursive `$ref`s

Schemas that model recursive unions (for example a `FilterGroup` whose `filters` items are
`anyOf: [FilterGroup, SoloFilter]`) previously failed type-checking with TypeScript error
**TS2615** ("Type of property X circularly references itself in mapped type") when used with
`NormalizeOAS`, `OASModel`, `OASOutput`, or `createClient`.

`json-schema-to-ts` expands `anyOf`/`oneOf` through `MergeSubSchema`, which produces anonymous
mapped types that break TypeScript's cycle detection. feTS now detects these circular
`anyOf`/`oneOf` graphs (via the `$id` markers injected by `$ref` resolution) and routes them
through a named recursive `DirectType` alias that TypeScript can evaluate lazily—the same pattern
as `type Tree<T> = { value: T; children: Tree<T>[] }`.

```ts
// FilterGroup → filters → anyOf → FilterGroup no longer throws TS2615
type Normalized = NormalizeOAS<typeof spec>
type FilterGroup = OASModel<Normalized, 'FilterGroup'>
const client = createClient<Normalized>({ endpoint: 'https://api.example.com' })
const body = { filters: [{ field: 'targetIp' }] }
await client['/test'].post({ json: body })
```
