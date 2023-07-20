---
'fets': patch
---

Fix the bug happening when there are multiple request bodies are defined in a single operation.

For example;

If the following exists in the OpenAPI spec,
```json
{
    "requestBody": {
        "application/json": "...",
        "multipart/form-data": "...",
        "required": true
    }
}
```

feTS shouldn't take both `json` and `formData` required;

```ts
client['/user'].post({
    // Both shouldn't be required because only one of them is enough.
    json: { name: 'John' },
    formData: { name: 'John' }
})
```