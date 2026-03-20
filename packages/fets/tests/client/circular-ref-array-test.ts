import {
  createClient,
  OASJSONResponseSchema,
  OASModel,
  OASOutput,
  type FromSchema,
  type NormalizeOAS,
} from 'fets';
import type treeArrayOAS from './fixtures/example-circular-ref-array-oas';

// This resolves circular reference correctly
type NormalizedOAS = NormalizeOAS<typeof treeArrayOAS>;

// So it does handle circular reference with array items
type SchemaInOAS =
  NormalizedOAS['paths']['/tree']['get']['responses']['200']['content']['application/json']['schema'];

type Test = FromSchema<SchemaInOAS>;

const a: Test = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [a];
      },
    },
  ],
};

if (a.children?.[0]?.children?.[0]) {
  // @ts-expect-error number is a number
  a.children[0].children[0].number = 'a';
  a.children[0].children[0].number = 1;
}

type Test2 = FromSchema<OASJSONResponseSchema<NormalizedOAS, '/tree', 'get', '200'>>;

const b: Test2 = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [b];
      },
    },
  ],
};

type Test3 = OASOutput<NormalizedOAS, '/tree', 'get', '200'>;

const c: Test3 = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [c];
      },
    },
  ],
};

const client = createClient<NormalizedOAS>({});

// This should work without TS2615 circular reference error
const response = await client['/tree'].get();

if (response.ok) {
  const body = await response.json();
  if (body.children?.[0]?.children?.[0]) {
    // @ts-expect-error number is a number
    body.children[0].children[0].number = 'a';

    body.children[0].children[0].number = 1;
  }
} else {
  console.log(response.status);
}

type NodeA = OASModel<NormalizedOAS, 'Node'>;
const nodeA = {} as NodeA;
const numberA = nodeA.children?.[0]?.children?.[0]?.number;
type NumberA = typeof numberA;
let numberAVar: NumberA;
numberAVar = 2;
// @ts-expect-error - numberAVar is a number
numberAVar = 'a';

console.log(numberAVar);
