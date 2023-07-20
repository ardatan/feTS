---
'fets': patch
---

Fix the bug happening when there is no successful response defined in the OpenAPI spec but only `default`;

For example;

```json
    {
        // No 2xx response defined.
        "responses": {
            "400": {
                "description": "Bad Request"
                //...
            },
            "default": {
                "description": "Successful response"
                //...
            }
        }
    }
```

Then feTS should take the `default` response as the successful response.

```ts
const response = await client['/user'].post({
    json: { name: 'John' }
})

if (!res.ok) {
    // 400 should be here
} else {
    // default should be here
}
```

