import { runTests } from '@e2e/shared-scripts';
import { createVercelDeployment } from './createVercelDeployment';

runTests(createVercelDeployment())
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
