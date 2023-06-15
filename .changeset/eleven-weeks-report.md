---
'fets': patch
---

Client;
- No more optional for each request parameter object, make them required if they are in OAS
- Now endpoint is required if OAS has `servers.url` in `createClient` options

Server;
- `requestBody` is now required in the generated OAS
