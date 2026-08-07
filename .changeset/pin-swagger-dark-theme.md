---
'fets': patch
---

Pin the Swagger UI dark-theme CSS to an immutable jsDelivr GitHub commit

The dark stylesheet is loaded from `cdn.jsdelivr.net/gh/Itz-fork/Fastapi-Swagger-UI-Dark@868ea5da…` with SRI, so upstream default-branch changes cannot invalidate the integrity hash or swap the file silently.
