import { runTests } from '@e2e/shared-scripts';
import { createAzureFunctionDeployment } from './createAzureFunctionDeployment';

runTests(createAzureFunctionDeployment()).catch(err => {
  console.error(err);
  process.exit(1);
});
