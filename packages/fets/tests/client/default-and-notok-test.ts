import { createClient, type NormalizeOAS } from 'fets';
import type kratosSchema from './fixtures/example-default-and-notok-oas';

export type KratosNormalized = NormalizeOAS<typeof kratosSchema>;
export const kratos = createClient<KratosNormalized>({
  endpoint: 'http://localhost:4433',
});

const response = await kratos['/self-service/registration'].post({
  query: { flow: 'flow-id' },
  json: {
    method: 'password',
    traits: { email: 'email' },
    password: 'password',
  },
});

switch (response.status) {
  case 200: {
    const json = await response.json();
    console.log(json.session);
    // ...
    break;
  }
  case 400: {
    const json = await response.json();
    console.log(json.active);
    // ...
    break;
  }
  case 410: {
    const json = await response.json();
    console.log(json.error?.id);
    // ...
    break;
  }
  case 422: {
    const json = await response.json();
    console.log(json.redirect_browser_to);
    // ...
    break;
  }
  default: {
    const otherError = await response.json();
    console.log(otherError.error?.message);
    // ...
    break;
  }
}
