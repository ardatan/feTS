import {
  createClient,
  OASJSONResponseSchema,
  OASOutput,
  type FromSchema,
  type NormalizeOAS,
} from 'fets';
import type treeOAS from './fixtures/example-circular-ref-oas';

// This resolves circular reference correctly
type NormalizedOAS = NormalizeOAS<typeof treeOAS>;

// So it does handle circular reference actually
type SchemaInOAS =
  NormalizedOAS['paths']['/tree']['get']['responses']['200']['content']['application/json']['schema'];

type Test = FromSchema<SchemaInOAS>;

const a: Test = {
  number: 1,
  child: {
    number: 2,
    get child() {
      return a;
    },
  },
};

if (a.child?.child?.child) {
  // @ts-expect-error number is a number
  a.child.child.child.number = 'a';
  a.child.child.child.number = 1;
}

type Test2 = FromSchema<OASJSONResponseSchema<NormalizedOAS, '/tree', 'get', '200'>>;

const b: Test2 = {
  number: 1,
  child: {
    number: 2,
    get child() {
      return b;
    },
  },
};

type Test3 = OASOutput<NormalizedOAS, '/tree', 'get', '200'>;

const c: Test3 = {
  number: 1,
  child: {
    number: 2,
    get child() {
      return c;
    },
  },
};

const client = createClient<NormalizedOAS>({});

// Somehow here is a problem
const response = await client['/tree'].get(); // <--- HERE THERE IS AN ERROR TS2615 (circular reference for field "child")

if (response.ok) {
  const body = await response.json();
  if (body.child?.child?.child) {
    // @ts-expect-error number is a number
    body.child.child.child.number = 'a';

    body.child.child.child.number = 1;
  }
} else {
  console.log(response.status);
}
