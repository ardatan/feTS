import { runTests } from '@e2e/shared-scripts';
import { createCfDeployment } from '../../cloudflare-workers/scripts/createCfDeployment';

runTests(createCfDeployment('cloudflare-modules', true)).catch(err => {
  console.error(err);
  process.exit(1);
});
