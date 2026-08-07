---
'fets': patch
---

Pin Swagger UI CDN assets and load them with Subresource Integrity (SRI)

Swagger UI previously pulled unversioned `unpkg.com/swagger-ui-dist` scripts/styles without integrity checks. Assets are now pinned to `swagger-ui-dist@5.11.0` and loaded via `<link>`/`<script>` tags with `integrity` + `crossorigin`, so a compromised CDN cannot silently swap the payload.
