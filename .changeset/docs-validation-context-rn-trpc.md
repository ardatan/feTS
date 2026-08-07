---
'fets': patch
---

Document TypeBox-only runtime validation, OpenAPI response schemas, server context, React Native, and tRPC comparison

Clarify several behaviors that were easy to misread from the docs:

- **Runtime validation** requires TypeBox (`Type.*`). Plain JSON Schema objects still provide
  TypeScript types and OpenAPI metadata, but are not validated at runtime.
- **Handler return types** are inferred for the typed router client, but do **not** populate
  OpenAPI `responses` — define `schemas.responses` explicitly when you need them in the spec.
- **Server context**: document `createRouter<TServerContext>()` and the handler `context` argument.
- **React Native / Expo**: note Metro/`@sinclair/typebox` resolution workarounds; feTS does not
  ship first-class RN shims.
- **tRPC**: short comparison table on the server comparison page (OpenAPI/HTTP-first vs RPC-first).
- **`globalParams`**: document that standard `RequestInit` fields (e.g. `credentials`) are supported.
- **Query params**: note TypeBox string→number/boolean coercion.
