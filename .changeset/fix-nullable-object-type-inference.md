---
'fets': patch
---

Fix object types with array `type` (e.g. `["object", "null"]`) being inferred as `undefined`

OpenAPI 3.1 schemas that declare a nullable object using an array type such as `"type": ["object", "null"]` were incorrectly inferred as `undefined` in the feTS client instead of resolving to the correct union type (e.g. `{ url: string; name: string; size: number } | null`).

The root cause was in the `FixJSONSchema` type pipeline:

- `FixMissingTypeObject` unconditionally added `& { type: 'object' }` to any schema with `properties`, even when `type` was already set. For `type: ["object", "null"]` this produced `{ type: ["object", "null"] } & { type: 'object' }` → `{ type: never }`, causing `json-schema-to-ts` to yield `undefined`.
- `FixMissingAdditionalProperties` only matched `type: 'object'` (string literal), so schemas with array types never received the required `additionalProperties: false` injection.

Both helpers have been updated to correctly handle array-style type declarations.
