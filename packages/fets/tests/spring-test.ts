import { createClient, type NormalizeOAS } from 'fets';
import exampleSpringOas from './fixtures/example-spring-oas';

const client = createClient<NormalizeOAS<typeof exampleSpringOas>>({});

client['/user'].post({
  json: {
    username: 'test',
    password: 'test',
  },
});

client['/pet'].post({
  json: {
    name: 'test',
    photoUrls: [],
    // @ts-expect-error a property is missing
    a: 1,
  },
  headers: {
    Authorization: 'Bearer token',
  },
});

// @ts-expect-error headers are missing
client['/pet'].post({
  json: {
    name: 'test',
    photoUrls: [],
  },
});
