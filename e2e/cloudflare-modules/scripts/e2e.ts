import { runTests } from '@e2e/shared-scripts';
import { createCfDeployment } from '../../cloudflare-workers/scripts/createCfDeployment';

runTests(createCfDeployment('cloudflare-modules', true))
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
