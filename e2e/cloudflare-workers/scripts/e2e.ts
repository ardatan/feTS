import { runTests } from '@e2e/shared-scripts';
import { createCfDeployment } from './createCfDeployment';

runTests(createCfDeployment('cloudflare-workers')).catch(err => {
  console.error(err);
  process.exit(1);
});
