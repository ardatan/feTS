import { createClient, type NormalizeOAS } from 'fets';
import exampleSpringOas from './fixtures/example-spring-oas';

const client = createClient<NormalizeOAS<typeof exampleSpringOas>>({});

const createUserRes = await client['/user'].post({
  json: {
    username: 'test',
    password: 'test',
  },
});

if (!createUserRes.ok) {
  throw new Error('failed');
}

const createdUser = await createUserRes.json();

const newUsername: string = createdUser.username!;
console.log('newUsername', newUsername);

console.log({
  id: createdUser.id,
  username: createdUser.username,
  // @ts-expect-error a property is missing
  a: createdUser.a,
});

const createPetRes = await client['/pet'].post({
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

if (!createPetRes.ok) {
  throw new Error(`failed with status: ${createPetRes.status} ${createPetRes.statusText}}`);
}

const createdPet = await createPetRes.json();

const newPetName: string = createdPet.name;
console.log('newPetName', newPetName);

console.log({
  id: createdPet.id,
  name: createdPet.name,
  // @ts-expect-error a property is missing
  a: createdPet.a,
});

// @ts-expect-error headers are missing
client['/pet'].post({
  json: {
    name: 'test',
    photoUrls: [],
  },
});
