import { runTests } from '@e2e/shared-scripts';
import { createAzureFunctionDeployment } from './createAzureFunctionDeployment';

runTests(createAzureFunctionDeployment())
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
