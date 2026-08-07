import { createClient, OASModel, type NormalizeOAS } from 'fets';
import type anyOfCircularRefOAS from './fixtures/example-anyof-circular-ref-oas';

// This resolves anyOf circular reference correctly
type NormalizedOAS = NormalizeOAS<typeof anyOfCircularRefOAS>;

// OASModel should work for the schemas
type FilterGroupModel = OASModel<NormalizedOAS, 'FilterGroup'>;
type SoloFilterModel = OASModel<NormalizedOAS, 'SoloFilter'>;
type RequestBodyModel = OASModel<NormalizedOAS, 'RequestBody'>;

const filterGroup = {} as FilterGroupModel;

// Should be able to navigate the anyOf circular structure
const nestedOperator = filterGroup.filters?.[0];
type NestedFilterType = typeof nestedOperator;
let nestedFilterVar: NestedFilterType;
nestedFilterVar = { field: 'targetIp' };
nestedFilterVar = { operator: 'AND', filters: [] };
console.log(nestedFilterVar);

const soloFilter = {} as SoloFilterModel;
const fieldValue = soloFilter.field;
type FieldType = typeof fieldValue;
let fieldVar: FieldType;
fieldVar = 'some-field';
// @ts-expect-error - fieldVar is a string
fieldVar = 42;
console.log(fieldVar);

const requestBody = {} as RequestBodyModel;
const filters = requestBody.filters;
type FiltersType = typeof filters;
let filtersVar: FiltersType;
filtersVar = [{ field: 'targetIp' }];
filtersVar = [{ operator: 'AND', filters: [] }];
console.log(filtersVar);

const client = createClient<NormalizedOAS>({ endpoint: 'http://example.com' });

// This should work without TypeScript circular reference error
// even when passing a body variable instead of a literal
const simpleFilters = [{ field: 'targetIp', comparator: 'eq', value: '1.2.3.4' }];
const body = {
  filters: simpleFilters,
};

// Both variable and literal forms should work
void client['/test'].post({ json: body });
void client['/test'].post({ json: { filters: simpleFilters } });
