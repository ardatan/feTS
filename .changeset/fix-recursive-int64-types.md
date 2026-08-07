---
'fets': patch
---

Preserve `number | bigint` for `format: int64` fields on recursive / self-referential schemas

When a schema recursively referenced itself (for example `Node.child → Node`), feTS disabled
`json-schema-to-ts` deserialize mappings to avoid TS2615. That also dropped the int64 widening, so
`integer` + `format: int64` incorrectly inferred as `number` instead of `number | bigint`.

Recursive schemas now go through `DirectType`, which maps `format: int64` (and `format: binary`)
the same way non-circular schemas do via deserialize.

```ts
type Node = OASModel<NormalizeOAS<typeof treeOAS>, 'Node'>
// node.number is number | bigint | undefined (was number | undefined)
const n: Node = { number: 1n, child: { number: 2 } }
```
