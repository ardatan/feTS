---
'fets': patch
---

Fix client sending HTTP methods in lowercase (e.g. `patch` instead of `PATCH`). The client now normalizes all HTTP methods to uppercase before sending the request.
