import { OASModel, type NormalizeOAS } from 'fets';

// OpenAPI 3.0 nullable $ref idiom. NormalizeOAS stamps `$id` onto the resolved
// Address, but Stage is not recursive — FromSchema must not fall back to DirectType.
// See: https://github.com/ardatan/feTS/issues/4104
const spec = {
  openapi: '3.0.0',
  info: { title: 't', version: '1' },
  paths: {},
  components: {
    schemas: {
      Address: {
        type: 'object',
        properties: {
          line1: { type: 'string' },
          tags: { type: 'object', additionalProperties: { type: 'string' } },
        },
        required: ['line1'],
      },
      Stage: {
        type: 'object',
        properties: {
          address: { nullable: true, oneOf: [{ $ref: '#/components/schemas/Address' }] },
          note: { type: 'string', nullable: true },
        },
        required: [],
      },
    },
  },
} as const;

type NormalizedOAS = NormalizeOAS<typeof spec>;
type Stage = OASModel<NormalizedOAS, 'Stage'>;

declare const stage: Stage;

const address: { line1: string; tags?: Record<string, string> } | null | undefined = stage.address;
const note: string | null | undefined = stage.note;
void address;
void note;

stage.address = null;
stage.note = null;

if (address) {
  const tags: Record<string, string> | undefined = address.tags;
  void tags;
  // @ts-expect-error tags values are strings
  const _badTags: Record<string, number> | undefined = address.tags;
  void _badTags;
}

// @ts-expect-error note is string | null | undefined, not number
stage.note = 1;
