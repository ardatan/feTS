import { runTests } from '@e2e/shared-scripts';
import { createAwsLambdaDeployment } from './createAwsLambdaDeployment';

runTests(createAwsLambdaDeployment()).catch(err => {
  console.error(err);
  process.exit(1);
});
