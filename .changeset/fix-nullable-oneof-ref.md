---
'fets': patch
---

Stop treating OpenAPI 3.0 nullable `$ref`s (`nullable: true, oneOf: [{ $ref }]`) as circular schemas

`HasCircularAnyOfRef` used any `$id` on an `anyOf`/`oneOf` member as a cycle signal, but `NormalizeOAS` stamps `$id` onto every resolved `$ref`. Non-recursive schemas then fell through to `DirectType`, which dropped `| null` and `additionalProperties`.

Cycle detection now requires the expanded `$ref` to actually be the enclosing schema (or a nested self-reference like `RequestBody → FilterGroup → FilterGroup`). `DirectType` also maps `nullable` and `additionalProperties` for schemas that are genuinely recursive.
