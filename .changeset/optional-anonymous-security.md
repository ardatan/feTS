---
'fets': patch
---

Make client auth params optional when an operation's `security` array includes an anonymous alternative (`{}`)

OpenAPI allows listing an empty security requirement beside authenticated schemes so callers may omit credentials. The client types previously still required auth params whenever any scheme was present. Empty `{}` entries are now detected and the corresponding auth params become optional.
