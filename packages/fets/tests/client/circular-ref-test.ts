import {
  createClient,
  OASJSONResponseSchema,
  OASModel,
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
  // @ts-expect-error number is number | bigint
  a.child.child.child.number = 'a';
  a.child.child.child.number = 1;
  a.child.child.child.number = 1n;
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
    // @ts-expect-error number is number | bigint
    body.child.child.child.number = 'a';

    body.child.child.child.number = 1;
    body.child.child.child.number = 1n;
  }
} else {
  console.log(response.status);
}

type NodeA = OASModel<NormalizedOAS, 'Node'>;
const nodeA = {} as NodeA;
const numberA = nodeA.child?.child?.child?.child?.number;
type NumberA = typeof numberA;
let numberAVar: NumberA;
numberAVar = 2;
numberAVar = 2n;
// @ts-expect-error - numberAVar is number | bigint
numberAVar = 'a';

console.log(numberAVar);
