# fets

## 0.4.7

### Patch Changes

- [#376](https://github.com/ardatan/feTS/pull/376)
  [`5dc2a08`](https://github.com/ardatan/feTS/commit/5dc2a086d9a94925781ad6c20507d58d87c01e43)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix complex union issue happening if there are a
  lot of parameters defined in OAS, and request parameters are now simplified automatically during
  autocompletion

## 0.4.6

### Patch Changes

- [#363](https://github.com/ardatan/feTS/pull/363)
  [`85bd174`](https://github.com/ardatan/feTS/commit/85bd17471671f52d63b73379ce0c66b5c047daaf)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix the bug happening when there is no successful
  response defined in the OpenAPI spec but only `default`;

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
    json: { name: 'John' },
  });

  if (!res.ok) {
    // 400 should be here
  } else {
    // default should be here
  }
  ```

- [#360](https://github.com/ardatan/feTS/pull/360)
  [`098806a`](https://github.com/ardatan/feTS/commit/098806ad1006496a3bf60eed85634c091de8adab)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix the bug happening when there are multiple
  request bodies are defined in a single operation.

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
    formData: { name: 'John' },
  });
  ```

- [#363](https://github.com/ardatan/feTS/pull/363)
  [`85bd174`](https://github.com/ardatan/feTS/commit/85bd17471671f52d63b73379ce0c66b5c047daaf)
  Thanks [@ardatan](https://github.com/ardatan)! - Add comments to the types and fields

## 0.4.5

### Patch Changes

- [#358](https://github.com/ardatan/feTS/pull/358)
  [`5cc42a9`](https://github.com/ardatan/feTS/commit/5cc42a9344a600bb4395fabe595387610a5c76f9)
  Thanks [@ardatan](https://github.com/ardatan)! - Less strict `endpoint` parameter to allow users
  to give different endpoints (behind proxy etc)

## 0.4.4

### Patch Changes

- [`888dd1e`](https://github.com/ardatan/feTS/commit/888dd1e6f0d584409dd4ccd388f6258cee6efe80)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix Authentication support with JSON bodies

- [#355](https://github.com/ardatan/feTS/pull/355)
  [`b5f0c17`](https://github.com/ardatan/feTS/commit/b5f0c17adf6e64f1ddb1f1ab953e3da03b9056dc)
  Thanks [@ardatan](https://github.com/ardatan)! - Improve Swagger 2.0 support

## 0.4.3

### Patch Changes

- [#341](https://github.com/ardatan/feTS/pull/341)
  [`5222e99`](https://github.com/ardatan/feTS/commit/5222e998df5002c837518b85f3968343d56aecae)
  Thanks [@ardatan](https://github.com/ardatan)! - Set default values for `RouteHandler`'s generics

## 0.4.2

### Patch Changes

- [#335](https://github.com/ardatan/feTS/pull/335)
  [`1fdab11`](https://github.com/ardatan/feTS/commit/1fdab11c0555baf15637a53f02a95bec48bc7d61)
  Thanks [@ardatan](https://github.com/ardatan)! - Support recursive nested types

## 0.4.1

### Patch Changes

- [#326](https://github.com/ardatan/feTS/pull/326)
  [`6b2d08a`](https://github.com/ardatan/feTS/commit/6b2d08a14bb8af177e97ef132ca65a80ff79d833)
  Thanks [@ardatan](https://github.com/ardatan)! - Support `application/x-www-form-urlencoded`

- [#311](https://github.com/ardatan/feTS/pull/311)
  [`f8f269e`](https://github.com/ardatan/feTS/commit/f8f269eb7c1346ac4e01d001c03dfe8b172ab109)
  Thanks [@ardatan](https://github.com/ardatan)! - Include OAuth2 workflow

## 0.4.0

### Minor Changes

- [#223](https://github.com/ardatan/feTS/pull/223)
  [`6217215`](https://github.com/ardatan/feTS/commit/621721559528476e1fa5788f9d5b52c8fec2db87)
  Thanks [@kylem123](https://github.com/kylem123)! - Altered logic on get query params to return
  undefined when optional prop is missing or the empty string

- [#317](https://github.com/ardatan/feTS/pull/317)
  [`77d1b25`](https://github.com/ardatan/feTS/commit/77d1b2548b46c80fb15853ff035cada5628a147c)
  Thanks [@beerose](https://github.com/beerose)! - Remove Mutable from the public API

### Patch Changes

- [#320](https://github.com/ardatan/feTS/pull/320)
  [`695c091`](https://github.com/ardatan/feTS/commit/695c0919408c593bff1b16ec99708456aca3bbaf)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix allOf references

- [#321](https://github.com/ardatan/feTS/pull/321)
  [`e95fd8f`](https://github.com/ardatan/feTS/commit/e95fd8f824293bc452958ad320a4f1ed5f7eae7c)
  Thanks [@ardatan](https://github.com/ardatan)! - Support other Auth types and Security Schemes in
  OpenAPI operation definitions

## 0.3.2

### Patch Changes

- [#316](https://github.com/ardatan/feTS/pull/316)
  [`9f25175`](https://github.com/ardatan/feTS/commit/9f2517590baf06ca5e2e01c3db57299dae3bfca1)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:

  - Added dependency [`ts-toolbelt@^9.6.0` ↗︎](https://www.npmjs.com/package/ts-toolbelt/v/9.6.0)
    (to `dependencies`)

- [#316](https://github.com/ardatan/feTS/pull/316)
  [`9f25175`](https://github.com/ardatan/feTS/commit/9f2517590baf06ca5e2e01c3db57299dae3bfca1)
  Thanks [@ardatan](https://github.com/ardatan)! - - Support `parameters` in the OpenAPI Path
  objects

  - Support dots in `components.schemas` names

- [#309](https://github.com/ardatan/feTS/pull/309)
  [`663d2e0`](https://github.com/ardatan/feTS/commit/663d2e072a8b2a9ca542ac49d1bce63e0dd1a93f)
  Thanks [@ardatan](https://github.com/ardatan)! - Make `requestParams` required only if any params
  are required, otherwise keep it optional

## 0.3.1

### Patch Changes

- [#307](https://github.com/ardatan/feTS/pull/307)
  [`d15afe4`](https://github.com/ardatan/feTS/commit/d15afe4dd412e5fe94fc3bb3586a7cf19cd58c68)
  Thanks [@ardatan](https://github.com/ardatan)! - Respect security schemes and definitions in the
  request parameters (Authorization header for OAuth etc)

## 0.3.0

### Minor Changes

- [`bb0b70b`](https://github.com/ardatan/feTS/commit/bb0b70b3ea66a4b3df18d79e1a7043237be54bf1)
  Thanks [@ardatan](https://github.com/ardatan)! - BREAKING: Use `NormalizeOAS` to normalize
  imported const schema type instead of \`Mutable\`

### Patch Changes

- [`bb0b70b`](https://github.com/ardatan/feTS/commit/bb0b70b3ea66a4b3df18d79e1a7043237be54bf1)
  Thanks [@ardatan](https://github.com/ardatan)! - Client: infer types from path parameters
  automatically

## 0.2.9

### Patch Changes

- [#258](https://github.com/ardatan/feTS/pull/258)
  [`a28661e`](https://github.com/ardatan/feTS/commit/a28661e90b8adc6f9873cc6eaf21cbce99f0ad7e)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`@whatwg-node/server@^0.9.0` ↗︎](https://www.npmjs.com/package/@whatwg-node/server/v/0.9.0)
    (from `^0.8.7`, in `dependencies`)

- [#279](https://github.com/ardatan/feTS/pull/279)
  [`951483c`](https://github.com/ardatan/feTS/commit/951483cc34f592e3cf19c562c0668697a6657661)
  Thanks [@ardatan](https://github.com/ardatan)! - Support response schemas for Swagger 2.0

- [#278](https://github.com/ardatan/feTS/pull/278)
  [`82d3bef`](https://github.com/ardatan/feTS/commit/82d3bef4ea3ea6fb40f398406a47b7171ade9297)
  Thanks [@ardatan](https://github.com/ardatan)! - Automatically fix definitions with `properties`
  but missing `type: object`

## 0.2.8

### Patch Changes

- [`7f1c985`](https://github.com/ardatan/feTS/commit/7f1c985b33d4de2ce7f7f30b93f64ff3f108e898)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix cookie compatibility

## 0.2.7

### Patch Changes

- [`d3e334e`](https://github.com/ardatan/feTS/commit/d3e334e4b4265915fe56100e8312a402384b6cfc)
  Thanks [@ardatan](https://github.com/ardatan)! - Performance optimizations

- [#261](https://github.com/ardatan/feTS/pull/261)
  [`bc6e8b4`](https://github.com/ardatan/feTS/commit/bc6e8b4ef9c6238d1cfdda2cbed360acc17b1bce)
  Thanks [@ardatan](https://github.com/ardatan)! - Performance optimizations for AJV

## 0.2.6

### Patch Changes

- [#251](https://github.com/ardatan/feTS/pull/251)
  [`7979639`](https://github.com/ardatan/feTS/commit/79796391c0ca6508e7b869244a30f6b63175eb1e)
  Thanks [@ardatan](https://github.com/ardatan)! - Client;

  - No more optional for each request parameter object, make them required if they are in OAS
  - Now endpoint is required if OAS has `servers.url` in `createClient` options

  Server;

  - `requestBody` is now required in the generated OAS

- [#251](https://github.com/ardatan/feTS/pull/251)
  [`7979639`](https://github.com/ardatan/feTS/commit/79796391c0ca6508e7b869244a30f6b63175eb1e)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:
  - Removed dependency
    [`openapi-types@^12.1.0` ↗︎](https://www.npmjs.com/package/openapi-types/v/12.1.0) (from
    `dependencies`)

## 0.2.5

### Patch Changes

- [`b1fa478`](https://github.com/ardatan/feTS/commit/b1fa47834f48dd1fdfe3943dd61b3a89f51a7be8)
  Thanks [@ardatan](https://github.com/ardatan)! - Small performance optimizations for lazy
  serialization

## 0.2.4

### Patch Changes

- [#226](https://github.com/ardatan/feTS/pull/226)
  [`96f0bb3`](https://github.com/ardatan/feTS/commit/96f0bb35d89ce60383dcb546290a0479c11b08a8)
  Thanks [@ardatan](https://github.com/ardatan)! - Workaround for missing type field and other
  response types

## 0.2.3

### Patch Changes

- [#220](https://github.com/ardatan/feTS/pull/220)
  [`0499f49`](https://github.com/ardatan/feTS/commit/0499f4938535205776837bcb53807defb72dd283)
  Thanks [@ardatan](https://github.com/ardatan)! - Performance optimizations

## 0.2.2

### Patch Changes

- [#216](https://github.com/ardatan/feTS/pull/216)
  [`49a7320`](https://github.com/ardatan/feTS/commit/49a7320c7bda3de82e4a51041973dbe5e60341fe)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:
  - Updated dependency
    [`@whatwg-node/fetch@^0.9.3` ↗︎](https://www.npmjs.com/package/@whatwg-node/fetch/v/0.9.3)
    (from `^0.9.0`, in `dependencies`)
  - Updated dependency
    [`@whatwg-node/server@^0.8.6` ↗︎](https://www.npmjs.com/package/@whatwg-node/server/v/0.8.6)
    (from `^0.8.1`, in `dependencies`)

## 0.2.1

### Patch Changes

- [#199](https://github.com/ardatan/feTS/pull/199)
  [`c71c072`](https://github.com/ardatan/feTS/commit/c71c0723c6def6cad95969d66a31ae9d2063cfb3)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:
  - Updated dependency
    [`@whatwg-node/server@^0.8.1` ↗︎](https://www.npmjs.com/package/@whatwg-node/server/v/0.8.1)
    (from `^0.8.0`, in `dependencies`)
  - Updated dependency
    [`json-schema-to-ts@^2.9.1` ↗︎](https://www.npmjs.com/package/json-schema-to-ts/v/2.9.1) (from
    `^2.7.2`, in `dependencies`)

## 0.2.0

### Minor Changes

- [`80c743c`](https://github.com/ardatan/feTS/commit/80c743c9b33a231e86c110452571d1f4c3cd41d2)
  Thanks [@ardatan](https://github.com/ardatan)! - BREAKING: OpenAPI customization is now done under
  \`openAPI\` property instead of the root option

### Patch Changes

- [#177](https://github.com/ardatan/feTS/pull/177)
  [`4de0ce6`](https://github.com/ardatan/feTS/commit/4de0ce65bac8fc1b8a2619173dcf962f21cef06a)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`@whatwg-node/cookie-store@^0.1.0` ↗︎](https://www.npmjs.com/package/@whatwg-node/cookie-store/v/0.1.0)
    (from `^0.0.1`, in `dependencies`)
  - Updated dependency
    [`@whatwg-node/fetch@^0.9.0` ↗︎](https://www.npmjs.com/package/@whatwg-node/fetch/v/0.9.0)
    (from `^0.8.2`, in `dependencies`)
  - Updated dependency
    [`@whatwg-node/server@^0.8.0` ↗︎](https://www.npmjs.com/package/@whatwg-node/server/v/0.8.0)
    (from `^0.7.4`, in `dependencies`)

- [`835b103`](https://github.com/ardatan/feTS/commit/835b103c47f9f1581f19801dfea7b75341860089)
  Thanks [@ardatan](https://github.com/ardatan)! - Support `servers` and `security`

## 0.1.5

### Patch Changes

- [#168](https://github.com/ardatan/feTS/pull/168)
  [`3e25f6d`](https://github.com/ardatan/feTS/commit/3e25f6d40095962cb9904d4d188d2950be20e65d)
  Thanks [@ardatan](https://github.com/ardatan)! - Respect base path in the generated OpenAPI
  document

## 0.1.4

### Patch Changes

- [`5f2b473`](https://github.com/ardatan/feTS/commit/5f2b473fef9e5f8002c702b74b502c079b47b4af)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix SwaggerUI

## 0.1.3

### Patch Changes

- [#149](https://github.com/ardatan/feTS/pull/149)
  [`9a6a6f9`](https://github.com/ardatan/feTS/commit/9a6a6f9d26e26ecac925a662a1bf08cf69e99a0a)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:
  - Added dependency [`zod@^3.21.4` ↗︎](https://www.npmjs.com/package/zod/v/3.21.4) (to
    `dependencies`)

## 0.1.2

### Patch Changes

- [`804c0b9`](https://github.com/ardatan/feTS/commit/804c0b9b07f3565b1d8ed8b2eb488e912dfcf6fd)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:

  - Added dependency [`hotscript@^1.0.11` ↗︎](https://www.npmjs.com/package/hotscript/v/1.0.11) (to
    `dependencies`)
  - Removed dependency [`zod@^3.21.4` ↗︎](https://www.npmjs.com/package/zod/v/3.21.4) (from
    `dependencies`)

- [#133](https://github.com/ardatan/feTS/pull/133)
  [`9bf4ee2`](https://github.com/ardatan/feTS/commit/9bf4ee2cd27bae9565eb124de1a2b8a7d5903c27)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`zod-to-json-schema@3.20.5` ↗︎](https://www.npmjs.com/package/zod-to-json-schema/v/3.20.5)
    (from `3.20.4`, in `dependencies`)

- [`804c0b9`](https://github.com/ardatan/feTS/commit/804c0b9b07f3565b1d8ed8b2eb488e912dfcf6fd)
  Thanks [@ardatan](https://github.com/ardatan)! - Handle $refs in all of the object types

## 0.1.1

### Patch Changes

- [`5768dd3`](https://github.com/ardatan/fets/commit/5768dd32abc195c354d9a8a1ca8b5c146ae8a47d)
  Thanks [@ardatan](https://github.com/ardatan)! - Cookies plugin and onFetch hook

## 0.1.0

### Minor Changes

- [#94](https://github.com/ardatan/fets/pull/94)
  [`4d9d110`](https://github.com/ardatan/fets/commit/4d9d110907bb8d044049445b016eca88e5a6413c)
  Thanks [@ardatan](https://github.com/ardatan)! - Make AJV opt-in

## 0.0.17

### Patch Changes

- [`f99b7fb`](https://github.com/ardatan/fets/commit/f99b7fbdafd416b8e09e40d6fc4bbc04d96a8718)
  Thanks [@ardatan](https://github.com/ardatan)! - Make inferred `RouterInput` params required

## 0.0.16

### Patch Changes

- [`900b05c`](https://github.com/ardatan/fets/commit/900b05c580a1a30c67cf2ac4ba39ad614fd4fe86)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix helper types

## 0.0.15

### Patch Changes

- [`bd791cc`](https://github.com/ardatan/fets/commit/bd791cc76194d307bbaecd045969c11e0cefce32)
  Thanks [@ardatan](https://github.com/ardatan)! - Export RouterInput and RouterOutput

## 0.0.14

### Patch Changes

- [`dffa521`](https://github.com/ardatan/fets/commit/dffa521aec9b852d446c495aa36adfcbc7c037ec)
  Thanks [@ardatan](https://github.com/ardatan)! - Prebuild Headers

## 0.0.13

### Patch Changes

- [`12a19fd`](https://github.com/ardatan/fets/commit/12a19fd3906527fa903ebfb26bdf60e4a8f5c95d)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix regression for missing iterator signature in
  TypedHeaders

## 0.0.12

### Patch Changes

- [`bde7e26`](https://github.com/ardatan/fets/commit/bde7e261ca2229f515f6689ae927529052acf8de)
  Thanks [@ardatan](https://github.com/ardatan)! - Align TypedHeaders with the default Headers

## 0.0.11

### Patch Changes

- [#41](https://github.com/ardatan/fets/pull/41)
  [`9b19754`](https://github.com/ardatan/fets/commit/9b19754f491a052a5fe5c0b6c5768e5f94988611)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:

  - Added dependency [`zod@^3.21.4` ↗︎](https://www.npmjs.com/package/zod/v/3.21.4) (to
    `dependencies`)
  - Added dependency
    [`zod-to-json-schema@3.20.4` ↗︎](https://www.npmjs.com/package/zod-to-json-schema/v/3.20.4) (to
    `dependencies`)

- [#41](https://github.com/ardatan/fets/pull/41)
  [`9b19754`](https://github.com/ardatan/fets/commit/9b19754f491a052a5fe5c0b6c5768e5f94988611)
  Thanks [@ardatan](https://github.com/ardatan)! - Relax types

- [#41](https://github.com/ardatan/fets/pull/41)
  [`9b19754`](https://github.com/ardatan/fets/commit/9b19754f491a052a5fe5c0b6c5768e5f94988611)
  Thanks [@ardatan](https://github.com/ardatan)! - Support Zod Schema

## 0.0.10

### Patch Changes

- [#35](https://github.com/ardatan/fets/pull/35)
  [`f0c1bf9`](https://github.com/ardatan/fets/commit/f0c1bf9345cfd1f4cc2021f5eac7c7fd478db7f6)
  Thanks [@ardatan](https://github.com/ardatan)! - New helpers and DX improvements

## 0.0.9

### Patch Changes

- [#15](https://github.com/ardatan/fets/pull/15)
  [`1a56d16`](https://github.com/ardatan/fets/commit/1a56d163ab057e0bb439e11cd5740c95e2573ad0)
  Thanks [@ardatan](https://github.com/ardatan)! - dependencies updates:

  - Updated dependency
    [`@ardatan/fast-json-stringify@^0.0.5` ↗︎](https://www.npmjs.com/package/@ardatan/fast-json-stringify/v/0.0.5)
    (from `^0.0.3`, in `dependencies`)

- [`5260836`](https://github.com/ardatan/fets/commit/52608362334d71ff6720842dc857697ba90644a0)
  Thanks [@ardatan](https://github.com/ardatan)! - Handle empty responses correctly

## 0.0.8

### Patch Changes

- [`3c3c7ac`](https://github.com/ardatan/fets/commit/3c3c7ac893ec30959555d12660a5289f105bc51a)
  Thanks [@ardatan](https://github.com/ardatan)! - Ability to provide schemas as models

- [`2ae7d99`](https://github.com/ardatan/fets/commit/2ae7d99d64fee65b143f1af22f0830aad6635055)
  Thanks [@ardatan](https://github.com/ardatan)! - Support integer with int64 format

## 0.0.7

### Patch Changes

- [`504707c`](https://github.com/ardatan/fets/commit/504707cc4154164b9b02d58a50ff859296c68482)
  Thanks [@ardatan](https://github.com/ardatan)! - Keep `formData` object after validation, and
  avoid extra url parsing

## 0.0.6

### Patch Changes

- [#403](https://github.com/ardatan/whatwg-node/pull/403)
  [`225b5fd`](https://github.com/ardatan/whatwg-node/commit/225b5fde78d53702fecb968cb2c8f7c113d41b47)
  Thanks [@ardatan](https://github.com/ardatan)! - Improvements

- Updated dependencies
  [[`225b5fd`](https://github.com/ardatan/whatwg-node/commit/225b5fde78d53702fecb968cb2c8f7c113d41b47)]:
  - @whatwg-node/server@0.7.4

## 0.0.5

### Patch Changes

- [#400](https://github.com/ardatan/whatwg-node/pull/400)
  [`60a215d`](https://github.com/ardatan/whatwg-node/commit/60a215d13602737c53c271ce4bb3077ad43ad943)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix Response.json incompatibility issues by
  replacing streams with deferred promises

## 0.0.4

### Patch Changes

- [`0ced08d`](https://github.com/ardatan/whatwg-node/commit/0ced08d7177aa53cc8ef5f73acdf8e08811dcd51)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix Cloudflare Workers compatibility

- Updated dependencies
  [[`3bac7e3`](https://github.com/ardatan/whatwg-node/commit/3bac7e375df861a2f7c5807731791dd3b863a9fe)]:
  - @whatwg-node/server@0.7.3

## 0.0.3

### Patch Changes

- [`5e2349d`](https://github.com/ardatan/whatwg-node/commit/5e2349d45e65a99d3182f6b0953e73094dc92b25)
  Thanks [@ardatan](https://github.com/ardatan)! - Embed fast-json-stringify and ajv into fets

## 0.0.2

### Patch Changes

- [`5146153`](https://github.com/ardatan/whatwg-node/commit/5146153fda49bc6e617c5849c23bb205bef28232)
  Thanks [@ardatan](https://github.com/ardatan)! - Fix `RouterOutput` and add `RouterClient`

## 0.0.1

### Patch Changes

- [#392](https://github.com/ardatan/whatwg-node/pull/392)
  [`1ce8f0a`](https://github.com/ardatan/whatwg-node/commit/1ce8f0a615916b2a78dfd2b973f450c9d53f46c0)
  Thanks [@renovate](https://github.com/apps/renovate)! - dependencies updates:

  - Updated dependency
    [`json-schema-to-ts@2.7.2` ↗︎](https://www.npmjs.com/package/json-schema-to-ts/v/2.7.2) (from
    `2.6.2`, in `dependencies`)

- [#380](https://github.com/ardatan/whatwg-node/pull/380)
  [`0df1ac7`](https://github.com/ardatan/whatwg-node/commit/0df1ac7d577ba831ce6431d68628b2028c37762f)
  Thanks [@ardatan](https://github.com/ardatan)! - New HTTP Framework

- Updated dependencies
  [[`0df1ac7`](https://github.com/ardatan/whatwg-node/commit/0df1ac7d577ba831ce6431d68628b2028c37762f),
  [`0df1ac7`](https://github.com/ardatan/whatwg-node/commit/0df1ac7d577ba831ce6431d68628b2028c37762f)]:
  - @whatwg-node/fetch@0.8.2
  - @whatwg-node/server@0.7.2
