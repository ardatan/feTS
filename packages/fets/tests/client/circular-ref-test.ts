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
type TreeSchemaInOAS =
  NormalizedOAS['paths']['/tree']['get']['responses']['200']['content']['application/json']['schema'];

type TreeTest = FromSchema<TreeSchemaInOAS>;

const a: TreeTest = {
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

type TreeTest2 = FromSchema<OASJSONResponseSchema<NormalizedOAS, '/tree', 'get', '200'>>;

const b: TreeTest2 = {
  number: 1,
  child: {
    number: 2,
    get child() {
      return b;
    },
  },
};

type TreeTest3 = OASOutput<NormalizedOAS, '/tree', 'get', '200'>;

const c: TreeTest3 = {
  number: 1,
  child: {
    number: 2,
    get child() {
      return c;
    },
  },
};

type TreeListSchemaInOAS =
  NormalizedOAS['paths']['/tree-list']['get']['responses']['200']['content']['application/json']['schema'];

type TreeListTest = FromSchema<TreeListSchemaInOAS>;

const d: TreeListTest = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [d];
      },
    },
  ],
};

if (d.children?.[0].children?.[0]?.children?.[0].number) {
  // @ts-expect-error number is a number
  d.children[0].children[0].children[0].number = 'a';
  d.children[0].children[0].children[0].number = 1;
}

type TreeListTest2 = FromSchema<OASJSONResponseSchema<NormalizedOAS, '/tree-list', 'get', '200'>>;

const e: TreeListTest2 = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [e];
      },
    },
  ],
};

type TreeListTest3 = OASOutput<NormalizedOAS, '/tree-list', 'get', '200'>;

const f: TreeListTest3 = {
  number: 1,
  children: [
    {
      number: 2,
      get children() {
        return [f];
      },
    },
  ],
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

type NodeA = OASModel<NormalizedOAS, 'Node'>;
const nodeA = {} as NodeA;
const numberA = nodeA.child?.child?.child?.child?.number;
type NumberA = typeof numberA;
let numberAVar: NumberA;
numberAVar = 2;
// @ts-expect-error - numberAVar is a number
numberAVar = 'a';

console.log(numberAVar);
