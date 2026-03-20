import { createClient, type NormalizeOAS } from '../../src/client';
import type nullableObjectOas from './fixtures/example-nullable-object-oas';

const client = createClient<NormalizeOAS<typeof nullableObjectOas>>({});

// object value should be accepted (not typed as undefined)
const res = await client['/receivers'].post({
  json: {
    id_doc_front_file: {
      url: 'https://example.com/document.pdf',
      name: 'File name.jpg',
      size: 123456,
    },
  },
});

const data = await res.json();
data.id = '123';

// null should also be accepted (nullable)
const res2 = await client['/receivers'].post({
  json: {
    id_doc_front_file: null,
  },
});

const data2 = await res2.json();
data2.id = '123';
