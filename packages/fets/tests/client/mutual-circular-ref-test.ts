import { createClient, OASModel, OASOutput, type NormalizeOAS } from 'fets';
import type workflowOAS from './fixtures/example-mutual-circular-ref-oas';

// This resolves mutual circular reference (Template → DAGTemplate → DAGTask → Template)
type NormalizedOAS = NormalizeOAS<typeof workflowOAS>;

// OASModel should work without TS2615 for mutually-recursive schemas
type TemplateModel = OASModel<NormalizedOAS, 'Template'>;
const template = {} as TemplateModel;

// Should be able to navigate the mutually-recursive structure
const taskName = template.dag?.tasks?.[0]?.name;
type TaskNameType = typeof taskName;
let taskNameVar: TaskNameType;
taskNameVar = 'my-task';
// @ts-expect-error - taskNameVar is a string
taskNameVar = 42;

console.log(taskNameVar);

// OASOutput should also work
type TemplateOutput = OASOutput<NormalizedOAS, '/workflow', 'get', '200'>;
const templateOutput = {} as TemplateOutput;
const outputTaskName = templateOutput.dag?.tasks?.[0]?.name;
type OutputTaskNameType = typeof outputTaskName;
let outputTaskNameVar: OutputTaskNameType;
outputTaskNameVar = 'another-task';
// @ts-expect-error - outputTaskNameVar is a string
outputTaskNameVar = 42;

console.log(outputTaskNameVar);

// createClient should also work without TS2615
const client = createClient<NormalizedOAS>({});
const response = await client['/workflow'].get();

if (response.ok) {
  const body = await response.json();
  const nestedTaskName = body.dag?.tasks?.[0]?.name;
  type NestedTaskNameType = typeof nestedTaskName;
  let nestedTaskNameVar: NestedTaskNameType;
  nestedTaskNameVar = 'nested-task';
  // @ts-expect-error - nestedTaskNameVar is a string
  nestedTaskNameVar = 42;
  console.log(nestedTaskNameVar);
} else {
  console.log(response.status);
}
