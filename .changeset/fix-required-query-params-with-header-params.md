---
"fets": patch
---

Fix required query parameters becoming optional when mixed with header parameters in the client type generation. Previously, when an endpoint had both query and header parameters, required query parameters were incorrectly typed as optional. The fix correctly checks whether any parameter of the specific type (query or header) is marked as `required: true` instead of using a tuple check across all parameter types.
